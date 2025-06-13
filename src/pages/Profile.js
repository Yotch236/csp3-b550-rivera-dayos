import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { Button, Row, Col, Card, Container, Spinner } from "react-bootstrap";
import countries from "../data/countries";
import EditProfileModal from "../components/profile/EditProfileModal";
import UserContext from "../context/UserContext";
import { Notyf } from "notyf";

const initialProfile = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  addressLine1: "",
  addressLine2: "",
  country: "",
  city: "",
  zipCode: "",
  stateRegion: "",
};

const Profile = () => {
  const { user } = useContext(UserContext);
  const notify = new Notyf();

  const [profile, setProfile] = useState(initialProfile);
  const [formData, setFormData] = useState(initialProfile);
  const [mobileValid, setMobileValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const selectedCountry = useMemo(() => {
    return (
      countries.find((c) => c.code === formData.country) || {
        dialCode: "",
        localNumberLength: 0,
        name: "",
      }
    );
  }, [formData.country]);

  useEffect(() => {
    if (user?.id) {
      const newProfile = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobileNo || "",
        addressLine1: user.address?.addressLine1 || "",
        addressLine2: user.address?.addressLine2 || "",
        country: user.address?.country || "",
        city: user.address?.city || "",
        zipCode: user.address?.zipcode || "",
        stateRegion: user.address?.stateRegion || "",
      };
      setProfile(newProfile);
      setFormData(newProfile);
    }
  }, [user]);

  useEffect(() => {
    const mobileNumber = (formData.mobile || "").replace(/\D/g, "");
    if (!mobileNumber || selectedCountry.localNumberLength === 0) {
      setMobileValid(null);
    } else {
      setMobileValid(mobileNumber.length === selectedCountry.localNumberLength);
    }
  }, [formData.mobile, selectedCountry]);

  useEffect(() => {
    const hasChanged = Object.keys(profile).some(
      (key) => (profile[key] || "").toString().trim() !== (formData[key] || "").toString().trim()
    );
    setHasChanges(hasChanged);
  }, [formData, profile]);

  const getValidationState = (fieldName) => {
    const value = formData[fieldName];
    if (!value) return { isValid: false, isInvalid: false };

    if (fieldName === "email") {
      const isValid = value.includes("@") && value.includes(".com");
      return { isValid, isInvalid: !isValid };
    }

    const isValid = value.trim() !== "";
    return { isValid, isInvalid: !isValid };
  };

  const handleShow = () => {
    setFormData(profile);
    setShowModal(true);
    setHasChanges(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData(profile);
    setHasChanges(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHasChanges(true);

    if (name === "mobile") {
      const cleanedValue = value.replace(/[^\d\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        country: value,
        mobile: "",
      }));
      setMobileValid(null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/users/details`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.message === "Profile updated successfully") {
        setProfile({ ...formData });
        notify.success("Changes Saved");
        handleClose();
      }
    } catch (error) {
      notify.error("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = useMemo(() => {
    const requiredFields = ["firstName", "lastName", "email", "mobile", "country", "city", "zipCode", "stateRegion"];
    return requiredFields.every((field) => formData[field]?.trim()) && mobileValid;
  }, [formData, mobileValid]);

  const isSaveDisabled = useMemo(() => !isFormValid || !hasChanges, [isFormValid, hasChanges]);

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column woody-bg"
      style={{ minHeight: "100vh" }}
    >
      <Container className="mt-4">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={6}>
            <Card className="p-4 shadow rounded" style={{ backgroundColor: "var(--woody-bg)" }}>
              <Card.Body>
                <Card.Title
                  className="mb-4 text-center"
                  style={{
                    color: "var(--woody-dark)",
                    borderBottom: "2px solid var(--woody-amber)",
                    paddingBottom: "8px",
                  }}
                >
                  Profile Details
                </Card.Title>

                <div style={{ borderTop: "1px solid var(--woody-amber-light)", paddingTop: "10px" }}>
                  {[
                    ["First Name", profile.firstName],
                    ["Last Name", profile.lastName],
                    ["Email", profile.email],
                    ["Mobile", `${selectedCountry.dialCode} ${profile.mobile}`],
                  ].map(([label, value]) => (
                    <Card.Text
                      key={label}
                      className="py-2 d-flex justify-content-between border-bottom"
                      style={{ borderColor: "var(--woody-amber-light)" }}
                    >
                      <strong>{label}:</strong>
                      <span style={{ color: "var(--woody-dark)" }}>{value}</span>
                    </Card.Text>
                  ))}
                  <Row>
                    <Col md={6}>
                      <Card.Text className="pt-2 text-woody-dark" style={{ lineHeight: "1.4" }}>
                        <strong>Address:</strong>
                        <br />
                        <span>{profile.addressLine1}</span>
                        <br />
                        {profile.addressLine2 && (
                          <>
                            <span c>{profile.addressLine2}</span>
                            <br />
                          </>
                        )}
                        <span>
                          {profile.city}, {profile.stateRegion} {profile.zipCode}
                        </span>
                        <br />
                        <span>{countries.find((c) => c.code === profile.country)?.name || profile.country}</span>
                      </Card.Text>
                    </Col>
                  </Row>
                </div>

                <div className="text-center mt-4">
                  <Button className="woody-toggle-btn" onClick={handleShow}>
                    Edit Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <EditProfileModal
          show={showModal}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSave={handleSave}
          formData={formData}
          selectedCountry={{ ...selectedCountry, allCountries: countries }}
          mobileValid={mobileValid}
          getValidationState={getValidationState}
          isSaveDisabled={isSaveDisabled}
          loading={loading}
        />
      </Container>

      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(255, 248, 240, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
        >
          <Spinner animation="border" variant="warning" />
        </div>
      )}
    </div>
  );
};

export default Profile;
