import variables from "~~/variables";

interface Credentials {
    email: String,
    password: String
}

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            authStatus: null as null | string,
            tableData: [] as any
        }
    },
    actions: {
        login(credentials: Credentials) {
            return new Promise((resolve, reject) => {
                if (credentials.email === variables.EMAIL && credentials.password === variables.PASSWORD) {
                    sessionStorage.setItem(variables.STORAGE_AUTH_KEY, 'authenticated');
                    this.authStatus = 'authenticated';
                    resolve(this.authStatus);
                } else {
                    reject('Error! Wrong credentials');
                }
            })
        },
        authenticate() {
            if (sessionStorage.getItem(variables.STORAGE_AUTH_KEY)) {
                this.authStatus = sessionStorage.getItem(variables.STORAGE_AUTH_KEY);
            } else {
                sessionStorage.setItem(variables.STORAGE_AUTH_KEY, 'not authenticated');
                this.authStatus = sessionStorage.getItem(variables.STORAGE_AUTH_KEY);
            }
        },
        logout() {
            sessionStorage.setItem(variables.STORAGE_AUTH_KEY, 'not authenticated');
            this.authStatus = 'not authenticated';
        },
        fetchTableData() {
            const daysInfoAmount = 5;
            const promises = [];

            for (let i = 0; i < daysInfoAmount; i++) {
                const date = new Date();
                const prevDay = new Date(date.setDate(date.getDate() - (i + 1))).toISOString().split('T')[0];
                promises.push(fetch(`https://covid-api.com/api/reports/total?date=${ prevDay }&iso=UKR`));
            }

            Promise.all(promises).then(values => {
                Promise.all(values.map(res => res.json()))
                    .then(data => {
                        this.tableData = data;
                        sessionStorage.setItem(variables.STORAGE_ITEMS_KEY, JSON.stringify(data));
                    })
            })
        },
        getTableData() {
            if (sessionStorage.getItem(variables.STORAGE_ITEMS_KEY)) {
                this.tableData = JSON.parse(sessionStorage.getItem(variables.STORAGE_ITEMS_KEY) as any);
            } else {
                this.fetchTableData();
            }
        },
        removeTableItem(i: any) {
            this.tableData = this.tableData.filter((elem: any, index: any) => index !== i);
            sessionStorage.setItem(variables.STORAGE_ITEMS_KEY, JSON.stringify(this.tableData));
        }
    },
    getters: {
        isAuth(state) {
            return state.authStatus !== null;
        },
        isLogged(state) {
            return state.authStatus === 'authenticated';
        }
    }
});
  
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}