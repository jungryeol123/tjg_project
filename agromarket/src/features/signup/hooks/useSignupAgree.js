import { useState, useEffect } from "react";
import { api } from "shared/lib/axios.js";

export function useSignupAgree() {
  const [hoveredId, setHoveredId] = useState(null);
  const [termList, setTermList] = useState([]);

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

  useEffect(() => {
    const load = async () => {
      const result = await api.get("/data/terms.json");
      setTermList(result.data.terms);
    };
    load();
  }, []);

  const handleAllAgree = (e) => {
    const c = e.target.checked;
    setAgree({
      all: c,
      terms: c,
      privacy: c,
      marketing: c,
      benefit: c,
      sms: c,
      email: c,
      age: c,
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

    const allChecked =
      updated.terms &&
      updated.privacy &&
      updated.marketing &&
      updated.sms &&
      updated.email &&
      updated.age;

    updated.all = allChecked;

    setAgree(updated);
  };

  return {
    agree,
    termList,
    hoveredId,
    setHoveredId,
    handleAgreeChange,
    handleAllAgree,
  };
}
