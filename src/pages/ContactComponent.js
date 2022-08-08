import React, { useEffect, useState } from "react";
import "../site.scss";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { AdPlug } from "../components/decorations/AdPlug";
import { ContactForm } from "../components/ContactForm";
import { ContactService } from "../api/ContactService";
import { ErrorModal } from "../components/ErrorModal";
import { SuccessModal } from "../components/SuccessModal";
import { useHistory } from "../hooks/useHistory";
import { APP_LOCATIONS, CONNECTION_ERROR } from "../utils/constants";

export const Contact = () => {
  const [contact, setContact] = useState(null);
  const [updatingContact, setUpdatingContact] = useState(false);
  const [loadingContact, setLoadingContact] = useState(true);
  const [responseError, setResponseError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const history = useHistory();
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
        auth.setError(CONNECTION_ERROR);
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
      setSuccessMessage("Contact updated!");
    } catch (error) {
      setResponseError(error);
      throw error;
    }
  };

  const addUsernameToContact = (c) => {
    return {
      ...c,
      userUsername: auth.user.username,
    };
  };

  const dropInFromRightSideOfScreen = () => {
    if (APP_LOCATIONS.indexOf(history.previousLocation) < 0) {
      return true;
    }
    return (
      APP_LOCATIONS.indexOf(history.currentLocation) <
      APP_LOCATIONS.indexOf(history.previousLocation)
    );
  };

  return (
    <div className="d-flex flex-grow-1 overflow-hidden">
      <motion.div
        className="d-flex flex-column flex-grow-1"
        initial={{ x: dropInFromRightSideOfScreen() ? "100vw" : "-100vw" }}
        animate={{
          x: "0vw",
          transition: {
            ease: "circOut",
          },
        }}
      >
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
      </motion.div>
      <AnimatePresence>
        {responseError && (
          <ErrorModal
            handleClose={() => setResponseError(null)}
            text={responseError}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {successMessage && (
          <SuccessModal
            handleClose={() => setSuccessMessage(null)}
            text={successMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
