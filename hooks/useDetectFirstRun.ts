import { kFirstRunKey } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export default function useDetectFirstRun()
{
    const [loading, setLoading] = useState(true);
    const [isFirstRun, setIsFirstRun] = useState(true);

    const mutateFirstRun = useCallback(async () => {
        await AsyncStorage.setItem(kFirstRunKey, 'false');
    }, [])

    const checkFirstRun = useCallback(async () => {
        const value = await AsyncStorage.getItem(kFirstRunKey);
        setIsFirstRun(value === null);
    }, [])

    useEffect(() => {
        checkFirstRun().then(() => {
            setLoading(false);
        });
    }, [])

    return {
        loading,
        isFirstRun,
        mutateFirstRun
    };
}