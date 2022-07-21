import React, { useEffect, useState } from "react";
import "./Contact.css";
import { API_URL } from "../config";
import { useAuth } from "../hooks/useAuth";
import { ContactForm } from "../components/ContactForm";
import { AdPlug } from "../components/AdPlug";

export const Contact = () => {
  const [contact, setContact] = useState(null);
  const [editableContact, setEditableContact] = useState({
    phone: "",
    address: "",
  });
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
        setEditableContact({ phone, address });
      } catch (errorMsg) {
        alert(errorMsg);
      }
    };
    fetchData();
  }, []);

  const revertChanges = () => {
    setEditableContact(contact);
  };

  return (
    <div className="Contact d-flex flex-column flex-grow-1">
      <AdPlug />
      <div className="d-flex align-items-center flex-grow-1">
        <h1 className="ms-5">Contact</h1>
        <div className="w-15"></div>
        <ContactForm
          contact={editableContact}
          onSubmit={() => {}}
          onCancel={revertChanges}
          onPhoneChange={(e) =>
            setEditableContact({ ...editableContact, phone: e.target.value })
          }
          onAddressChange={(e) =>
            setEditableContact({ ...editableContact, address: e.target.value })
          }
        />
      </div>
      <AdPlug />
    </div>
  );
};
