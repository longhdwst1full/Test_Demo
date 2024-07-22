import toast from "react-hot-toast";
import http from "../instances";
import { getAuthLocalData } from "../token";


const buildHeader = (includeAuth = true) => {
    let headers: {
        [key: string]: string;
    } = {
        'Content-type': 'application/json',
    };

    if (!includeAuth) {
        headers = {
            ...headers,
            Authorization: getAuthLocalData()?.access_token ?? '',
        };
    }

    return headers;
};
// types
export interface IResponse<D> {
    payload: D;
    status: string;
}
export const useSevices = () => {

    const postCaller = async <T, R>(
        url: string,
        data: T,
        includeAuth = true,
    ) => {

        try {
            const res = await http.post<R>(
                url,
                data,
                {
                    headers: buildHeader(includeAuth),
                    timeout: 180000,
                },
            );
            return Promise.resolve(res);
        } catch (err: any) {
            toast.error(err?.response?.data?.error || err.message)
        }
    };

    const postCallerFormData = async <T, R>(
        url: string,
        data: T,
        includeAuth = true,
    ) => {

        try {
            const res = await http.post<R>(
                url,
                data,
                {
                    headers: {
                        ...buildHeader(includeAuth),
                        'Content-Type': 'multipart/form-data'
                    },
                    timeout: 180000,
                },
            );
            return Promise.resolve(res);
        } catch (err: any) {
            toast.error(err?.response?.data?.error || err.message)
        }
    };

    const putCaller = async <T, R>(
        url: string,
        data: T,
        includeAuth = true,
        isPatch = true,
    ) => {
        try {
            const res = await (isPatch ? http.put : http.patch)<R>(url,

                data,
                {
                    headers: buildHeader(includeAuth),
                    timeout: 180000,
                })

            return (res);
        } catch (err: any) {

            toast.error(err?.response?.data?.error)
            return Promise.reject(err);
        }
    };

    const deleteCaller = async <R>(url: string, includeAuth = true) => {

        try {
            const res = await http.delete<R>(url, {
                headers: buildHeader(includeAuth),

            });

            return Promise.resolve(res);
        } catch (err: any) {
            console.log(err)
            toast.error(err.message)
        }
    };
    const getCaller = async <R>(url: string, includeAuth = true) => {

        try {
            const res = await http.get<R>(url, {
                headers: buildHeader(includeAuth),
            });

            return Promise.resolve(res);
        } catch (err: any) {

            return Promise.reject(err);
        }
    };

    return {
        getCaller,
        postCaller, postCallerFormData,
        deleteCaller, putCaller
    };
};
