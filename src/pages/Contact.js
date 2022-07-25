import React, { useEffect, useState } from "react";
import "../site.css";
import { API_URL } from "../config";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { phoneFormat } from "../regex";
import { AdPlug } from "../components/AdPlug";

export const Contact = () => {
  const [contact, setContact] = useState(null);
  const [editableContact, setEditableContact] = useState({
    phone: "",
    address: "",
  });
  const [updatingContact, setUpdatingContact] = useState(false);
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

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
          reset({ phone, address });
        }
      } catch (errorMsg) {
        alert(errorMsg);
      }
    };
    fetchData();
  }, []);

  const revertChanges = () => {
    reset({
      phone: contact.phone,
      address: contact.address,
    });
  };

  const handleSaveContact = async () => {
    try {
      let res;
      if (contact) {
        res = await fetch(
          `${API_URL}/contact/${auth.user.username}`,
          addHeadersForPostPut({
            method: "PUT",
            body: JSON.stringify(addUsernameToContact(getValues())),
          })
        );
      } else {
        res = await fetch(
          `${API_URL}/contact/`,
          addHeadersForPostPut({
            method: "POST",
            body: JSON.stringify(addUsernameToContact(getValues())),
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
      setContact(getValues());
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
        <form
          className="flex-grow-1"
          onSubmit={handleSubmit(handleSaveContact)}
        >
          <div className="row row-cols-4">
            <div className="col-3 me-5">
              <label htmlFor="phone" className="d-block mb-1">
                Phone
              </label>
            </div>
            <div className="col-3">
              <label htmlFor="address" className="d-block mb-1">
                Address
              </label>
            </div>
          </div>

          <div className="row row-cols-4">
            <div className="col-3 me-5">
              <input
                type="text"
                {...register("phone", {
                  required: "Phone number cannot be empty",
                  pattern: {
                    value: phoneFormat,
                    message: "Phone number not in correct format",
                  },
                  minLength: {
                    value: 10,
                    message:
                      "Phone number must be between 10 and 11 characters",
                  },
                  maxLength: {
                    value: 11,
                    message:
                      "Phone number must be between 10 and 11 characters",
                  },
                })}
                disabled={!updatingContact}
                className="border border-1 shadow-sm contact-input"
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                {...register("address", {
                  required: "Address cannot be empty",
                  minLength: {
                    value: 1,
                    message: "Address must be between 1 and 75 characters",
                  },
                  maxLength: {
                    value: 75,
                    message: "Address must be between 1 and 75 characters",
                  },
                })}
                disabled={!updatingContact}
                className="border border-1 shadow-sm contact-input"
              />
            </div>
            <div className="col ms-4">
              {updatingContact ? (
                <div className="d-flex align-items-end align-self-end">
                  <input
                    type="submit"
                    value="Save"
                    className="btn btn-success me-2"
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setUpdatingContact(false);
                      revertChanges();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary align-self-end"
                  onClick={() => setUpdatingContact(true)}
                >
                  Update
                </button>
              )}
            </div>
          </div>

          <div className="row row-cols-3">
            <div className="col-3 me-5">
              <span className="text-danger text-wrap d-block">
                {errors.phone?.message}
              </span>
            </div>
            <div className="col-3">
              <span className="text-danger d-block">
                {errors.address?.message}
              </span>
            </div>
          </div>
        </form>
        <div className="w-15"></div>
      </div>
      <AdPlug />
    </div>
  );
};
