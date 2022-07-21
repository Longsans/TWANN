import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useAuth } from "../hooks/useAuth";

export const Contact = () => {
  const [contact, setContact] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/contact/${auth.user.username}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        const { phone, address } = await res.json();
        setContact({ phone, address });
      } catch (errorMsg) {
        alert(errorMsg);
      }
    };
    fetchData();
  }, []);
};
