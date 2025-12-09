import { useState } from "react";

export function useSignupAgree() {
    const [hoveredId, setHoveredId] = useState(null);
    const [agree, setAgree] = useState({
        all: false,
        terms: false,
        privacy: false,
        marketing: false,
        benefit: false,
        sms: false,
        email: false,
        age: false,
    });

    const handleAllAgree = (e) => {
        const checked = e.target.checked;
        setAgree({
            all: checked,
            terms: checked,
            privacy: checked,
            marketing: checked,
            benefit: checked,
            sms: checked,
            email: checked,
            age: checked,
        });
    };

    const handleAgreeChange = (e) => {
        const { name, checked } = e.target;

        let updated = { ...agree, [name]: checked };

        if (name === "benefit") {
            updated.sms = checked;
            updated.email = checked;
        }

        updated.benefit = updated.sms && updated.email;

        updated.all =
            updated.terms &&
            updated.privacy &&
            updated.marketing &&
            updated.sms &&
            updated.email &&
            updated.age;

        setAgree(updated);
    };

    return { agree, handleAllAgree, handleAgreeChange, hoveredId, setHoveredId };
}
