import { useState } from "react";
import "./styles.css";

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  type?: string;
  consent?: string;
}

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors: Errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "This Field is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "This Field is required";
    }

    if (!email.trim()) {
      newErrors.email = "This Field is required";
    }

    if (!message.trim()) {
      newErrors.message = "This Field is required";
    }

    if (!type.trim()) {
      newErrors.type = "This Field is required";
    }

    if (!consent) {
      newErrors.consent = "To submit this form, please consent to being contacted"
    }

    setErrors(newErrors);
  }

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}>
          <h1>Contact Us</h1>

          <div className="div-flex">
            <div className="div-flex-column margin-right">
              <label htmlFor="first-name" className="margin-bottom">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="first-name"
                value={firstName}
                id="first-name"
                autoComplete="given-name"
                onChange={(event) => setFirstName(event.target.value)}
              />
              {errors.firstName && <p className="menssageError">{errors.firstName}</p>}
            </div>
            <div className="div-flex-column">
              <label htmlFor="last-name" className="margin-bottom">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="last-name"
                value={lastName}
                id="last-name"
                autoComplete="family-name"
                onChange={(event) => setLastName(event.target.value)}
              />
              {errors.lastName && <p className="menssageError">{errors.lastName}</p>}
            </div>
          </div>

          <label htmlFor="email" className="margin-bottom margin-top">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && <p className="menssageError">{errors.email}</p>}

          <label htmlFor="option-enquiry" className="margin-bottom margin-top">
            Query Type <span className="required">*</span>
          </label>
          <div className="div-flex">
            <label htmlFor="option-enquiry" className="options margin-right">
              <input
                type="radio"
                name="type"
                value="enquiry"
                id="option-enquiry"
                autoComplete="off"
                checked={type === "enquiry"}
                onChange={(event) => setType(event.target.value)}
              />
              General Enquiry
            </label>

            <label htmlFor="option-request" className="options">
              <input
                type="radio"
                name="type"
                value="support"
                id="option-request"
                autoComplete="off"
                checked={type === "support"}
                onChange={(event) => setType(event.target.value)}
              />
              Support Request
            </label>
          </div>
          {errors.type && <p className="menssageError">{errors.type}</p>}

          <label htmlFor="message" className="margin-bottom margin-top">
            Message <span className="required">*</span>
          </label>
          <textarea
            name="message"
            id="message"
            autoComplete="off"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          {errors.message && <p className="menssageError">{errors.message}</p>}

          <div className="div-select">
            <input type="checkbox" id="consent-checkbox" name="consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            <div id="consent">
              <label htmlFor="consent-checkbox">
                I consent to being contacted by the team{" "}
                <span className="required">*</span>
              </label>
            </div>
          </div>
          {errors.consent && <p className="menssageError">{errors.consent}</p>}

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}