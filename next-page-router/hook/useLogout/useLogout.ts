import { useRouter } from "next/router";
import { removeAuthLocalData } from "../token";



export const useLogout = () => {
    const router = useRouter();
    const logoutMutate = async () => {
        removeAuthLocalData();
        router.push('/login');
    };
    return {
        logoutMutate,
    };
};
