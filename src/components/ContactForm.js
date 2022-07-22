import React, { useState } from "react";

export const ContactForm = ({
  contact,
  updating,
  onSubmit,
  onCancel,
  onPhoneChange,
  onAddressChange,
  setUpdating,
}) => {
  return (
    <form
      className="d-flex flex-grow-1 align-items-center"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="me-5">
        <label htmlFor="phone" className="d-block mb-1">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          value={contact.phone}
          onChange={onPhoneChange}
          disabled={!updating}
          className="border border-1 shadow-sm"
        />
      </div>
      <div className="w-2"></div>
      <div>
        <label htmlFor="address" className="d-block mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={contact.address}
          onChange={onAddressChange}
          disabled={!updating}
          className="border border-1 shadow-sm"
        />
      </div>
      {updating ? (
        <div className="d-flex align-items-end ms-5 align-self-end">
          <input type="submit" value="Save" className="btn btn-success me-2" />
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
          className="btn btn-primary ms-5 align-self-end"
          onClick={() => setUpdating(true)}
        >
          Update
        </button>
      )}
    </form>
  );
};
