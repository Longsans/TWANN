import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CONTACT_RULES } from "../utils/constants";
import "./ContactForm.css";
import "./components.scss";

export const ContactForm = ({ contact, onSubmit, updating, setUpdating }) => {
  const phoneRules = CONTACT_RULES.phone;
  const addressRules = CONTACT_RULES.address;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    revertChanges();
  }, []);

  const revertChanges = () => {
    reset({
      phone: contact.phone,
      address: contact.address,
    });
  };

  const save = handleSubmit(() => {
    try {
      onSubmit(getValues());
    } catch (error) {
      revertChanges();
    }
  });

  return (
    <form className="flex-grow-1" onSubmit={save}>
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
              required: phoneRules.requiredError,
              pattern: {
                value: phoneRules.pattern,
                message: phoneRules.patternError,
              },
              minLength: {
                value: phoneRules.minLength,
                message: phoneRules.lengthError,
              },
              maxLength: {
                value: phoneRules.maxLength,
                message: phoneRules.lengthError,
              },
            })}
            disabled={!updating}
            className="border border-1 rounded-2 ig-input contact-input"
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            {...register("address", {
              required: addressRules.requiredError,
              minLength: {
                value: addressRules.minLength,
                message: addressRules.lengthError,
              },
              maxLength: {
                value: addressRules.maxLength,
                message: addressRules.lengthError,
              },
            })}
            disabled={!updating}
            className="border border-1 rounded-2 ig-input contact-input"
          />
        </div>
        <div className="col ms-4">
          {updating ? (
            <div className="d-flex align-items-end align-self-end">
              <input
                type="submit"
                value="Save"
                className="btn btn-success me-2"
              />
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setUpdating(false);
                  revertChanges();
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary align-self-end"
              onClick={() => setUpdating(true)}
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
          <span className="text-danger d-block">{errors.address?.message}</span>
        </div>
      </div>
    </form>
  );
};
