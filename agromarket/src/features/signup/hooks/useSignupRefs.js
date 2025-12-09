import React, { useMemo } from "react";

export function useSignupRefs(initArray) {
    const refs = useMemo(() => {
        return initArray.reduce((acc, cur) => {
            acc[`${cur}Ref`] = React.createRef();
            return acc;
        }, {});
    }, []);

    return refs;
}
