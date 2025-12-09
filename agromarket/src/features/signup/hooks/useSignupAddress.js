import { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export function useSignupAddress(form, setForm) {
    const [userFullAddress, setUserFullAddress] = useState("");

    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname) extraAddress += data.bname;
            if (data.buildingName)
                extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;

            fullAddress += extraAddress ? ` (${extraAddress})` : "";
        }

        setUserFullAddress(fullAddress);
        setForm({ ...form, zonecode: data.zonecode });
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return { userFullAddress, handleClick };
}
