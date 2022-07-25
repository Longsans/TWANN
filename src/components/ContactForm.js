import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { phoneFormat } from "../regex";
import "./ContactForm.css";

export const ContactForm = ({
  contact,
  updating,
  onSubmit,
  onCancel,
  onPhoneChange,
  onAddressChange,
  setUpdating,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log(errors.phone);
  }, [errors]);

  return (
    <form className="flex-grow-1" onSubmit={handleSubmit(onSubmit)}>
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
                message: "Phone number must be between 10 and 11 characters",
              },
              maxLength: {
                value: 11,
                message: "Phone number must be between 10 and 11 characters",
              },
            })}
            value={contact.phone}
            onChange={onPhoneChange}
            disabled={!updating}
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
            value={contact.address}
            onChange={onAddressChange}
            disabled={!updating}
            className="border border-1 shadow-sm contact-input"
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
                  onCancel();
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
