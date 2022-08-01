import React, { useEffect, useState } from "react";
import "../site.scss";
import { useAuth } from "../hooks/useAuth";
import { AdPlug } from "../components/decorations/AdPlug";
import { ContactForm } from "../components/ContactForm";
import { ContactService } from "../api/ContactService";

export const Contact = () => {
  const [contact, setContact] = useState(null);
  const [updatingContact, setUpdatingContact] = useState(false);
  const [loadingContact, setLoadingContact] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ContactService.getContact(
          auth.user.username,
          auth.accessToken
        );
        const body = await res.json();
        if (body) {
          const { phone, address } = body;
          setContact({ phone, address });
          setLoadingContact(false);
        }
      } catch (errorMsg) {
        alert(errorMsg);
      }
    };
    fetchData();
  }, []);

  const handleSaveContact = async (values) => {
    try {
      let res;
      if (contact) {
        res = await ContactService.updateContact(
          auth.user.username,
          auth.accessToken,
          addUsernameToContact(values)
        );
      } else {
        res = await ContactService.createContact(
          auth.accessToken,
          addUsernameToContact(values)
        );
      }

      if (!res.ok) {
        const err = await res.json();
        switch (res.status) {
          case 404:
            throw "User not found.";
          case 409:
            throw err.username;
          default: // 400
            throw Object.values(err).reduce(
              (prev, curr) => `${prev}.\
              ${curr}`
            );
        }
      }
      setContact(values);
      setUpdatingContact(false);
      alert("Contact updated!");
    } catch (error) {
      alert(error);
      throw error;
    }
  };

  const addUsernameToContact = (c) => {
    return {
      ...c,
      userUsername: auth.user.username,
    };
  };

  return (
    <div className="Contact d-flex flex-column flex-grow-1">
      <AdPlug />
      <div className="d-flex align-items-center flex-grow-1">
        <h1 className="ms-5">Contact</h1>
        <div className="w-15"></div>
        {!loadingContact && (
          <ContactForm
            contact={contact}
            onSubmit={handleSaveContact}
            updating={updatingContact}
            setUpdating={setUpdatingContact}
          />
        )}
        <div className="w-15"></div>
      </div>
      <AdPlug />
    </div>
  );
};
