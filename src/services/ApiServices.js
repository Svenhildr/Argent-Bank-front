const url = import.meta.env.VITE_URL;

export const apiService = {
    fetchToken: async (username, password) => {
        const res = await fetch(url + "user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        });
        const data = await res.json();

        if (data.status != 200) {
            return {
                status: data.status,
                errorMsg: data.message,
                token: null
            };
        }
        if (data.status == 200) {
            return {
                status: data.status,
                errorMsg: data.message,
                token: data.body.token
            };
        }
        return {
            status: 0,
            errorMsg: "unkown error",
            token: null
        };
    },
    fetchUser: async (token) => {
        const res = await fetch(url + "user/profile", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
        const data = await res.json();
        console.log(data);

        if (data.status != 200) {
            return {
                status: data.status,
                errorMsg: data.message,
                firstName: null,
                lastName: null,
                username: null
            };
        }
        if (data.status == 200) {
            return {
                status: data.status,
                errorMsg: data.message,
                firstName: data.body.firstName,
                lastName: data.body.lastName,
                username: data.body.email
            };
        }
        return {
            status: 0,
            errorMsg: "unkown error",
            firstName: null,
            lastName: null,
            username: null
        };
    },
    updateUserName: async (token, firstName, lastName) => {
        const res = await fetch(url + "user/profile", {
            method: "PUT", // méthode PUT pour la mise à jour
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                firstName,
                lastName
            })
        });

        const data = await res.json();
        if (data.status !== 200) {
            return {
                status: data.status,
                errorMsg: data.message
            };
        }

        return {
            status: 200,
            firstName: data.body.firstName,
            lastName: data.body.lastName
        };
    }
};
