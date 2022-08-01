import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT_RULES } from "../utils/constants";
import "./ContactForm.css";
import "./components.scss";
import variables from "../site.scss";

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
          <div className="d-flex align-items-end align-self-end">
            {updating ? (
              <motion.input
                type="submit"
                value="Update"
                className="btn btn-success me-2"
                initial={{ backgroundColor: variables.blue }}
                animate={{
                  backgroundColor: variables.green,
                  transition: {
                    duration: 0.2,
                  },
                }}
              />
            ) : (
              <motion.button
                className="btn btn-primary align-self-end me-2"
                onClick={() => setUpdating(true)}
                initial={{ backgroundColor: variables.green }}
                animate={{
                  backgroundColor: variables.blue,
                  transition: { duration: 0.2 },
                }}
              >
                Update
              </motion.button>
            )}
            <AnimatePresence>
              {updating && (
                <motion.button
                  key="cancel"
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    setUpdating(false);
                    revertChanges();
                  }}
                  initial={{ translateX: "-20px", width: 0 }}
                  animate={{
                    translateX: "10px",
                    width: "40%",
                    transition: {
                      translateX: {
                        ease: "circOut",
                      },
                      default: {
                        ease: "backOut",
                      },
                    },
                  }}
                  exit={{
                    translateX: "-10px",
                    width: 0,
                    transition: {
                      translateX: {
                        ease: "circIn",
                      },
                      default: {
                        ease: "backIn",
                      },
                    },
                  }}
                >
                  Cancel
                </motion.button>
              )}
            </AnimatePresence>
          </div>
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
