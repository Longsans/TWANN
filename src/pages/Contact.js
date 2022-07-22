import React, { useEffect, useState } from "react";
import "../site.css";
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
  const [updatingContact, setUpdatingContact] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_URL}/contact/${auth.user.username}`,
          addTokenToHeaders()
        );
        const body = await res.json();
        if (body) {
          const { phone, address } = body;
          setContact({ phone, address });
          setEditableContact({ phone, address });
        }
      } catch (errorMsg) {
        alert(errorMsg);
      }
    };
    fetchData();
  }, []);

  const revertChanges = () => {
    setEditableContact(contact);
  };

  const handleSaveContact = async () => {
    if (
      !(
        editableContact.phone &&
        editableContact.phone.trim() &&
        editableContact.address &&
        editableContact.address.trim()
      )
    ) {
      alert("You haven't filled all contact info.");
      return;
    }
    try {
      let res;
      if (contact) {
        res = await fetch(
          `${API_URL}/contact/${auth.user.username}`,
          addHeadersForPostPut({
            method: "PUT",
            body: JSON.stringify(addUsernameToContact(editableContact)),
          })
        );
      } else {
        res = await fetch(
          `${API_URL}/contact/`,
          addHeadersForPostPut({
            method: "POST",
            body: JSON.stringify(addUsernameToContact(editableContact)),
          })
        );
      }

      if (!res.ok) {
        const err = await res.json();
        switch (res.status) {
          case 400:
            throw Object.values(err).reduce(
              (prev, curr) => `${prev}.\
              ${curr}`
            );
          case 404:
            throw "User not found.";
          case 409:
            throw err.username;
        }
      }
      setContact(editableContact);
      alert("Contact updated!");
      setUpdatingContact(false);
    } catch (error) {
      alert(error);
      revertChanges();
    }
  };

  const addUsernameToContact = (c) => {
    return {
      ...c,
      userUsername: auth.user.username,
    };
  };

  const addHeadersForPostPut = (req) => {
    const result = addTokenToHeaders(req);
    result.headers["Content-Type"] = "application/json";
    return result;
  };

  const addTokenToHeaders = (req) => {
    if (req?.headers) {
      const result = req;
      result.headers["Authorization"] = `Bearer ${auth.token}`;
      return result;
    }
    return {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      ...req,
    };
  };

  return (
    <div className="Contact d-flex flex-column flex-grow-1">
      <AdPlug />
      <div className="d-flex align-items-center flex-grow-1">
        <h1 className="ms-5">Contact</h1>
        <div className="w-15"></div>
        <ContactForm
          contact={editableContact}
          updating={updatingContact}
          onSubmit={handleSaveContact}
          onCancel={revertChanges}
          onPhoneChange={(e) =>
            setEditableContact({ ...editableContact, phone: e.target.value })
          }
          onAddressChange={(e) =>
            setEditableContact({ ...editableContact, address: e.target.value })
          }
          setUpdating={(val) => setUpdatingContact(val)}
        />
      </div>
      <AdPlug />
    </div>
  );
};
