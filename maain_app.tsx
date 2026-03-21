// EVTC One Page Application
// All styling via styled-components, tokens and GlobalStyle are inline
// All content is loaded from inline db.json and matches db.schema.json
// All React components include data-component attributes
import React, { useMemo, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle, css } from "styled-components";

// -------------------- THEME TOKENS --------------------
const theme = {
    colors: {
        deepBlue: "#1F3A5F",
        tradeGold: "#C9A227",
        tradeGoldDark: "#A8891C",
        concreteGray: "#6E6E6E",
        workshopGray: "#F4F4F4",
        white: "#FFFFFF"
    },
    typography: {
        heading: "'Roboto Slab', 'Merriweather', serif",
        body: "'Open Sans', Arial, sans-serif"
    },
    fontWeights: {
        heading: 700,
        body: 400
    },
    fontSizes: {
        h1: "2.2rem",
        h2: "1.5rem",
        h3: "1.2rem",
        body: "1rem"
    },
    spacing: {
        section: "2.5em 0",
        card: "1.5em",
        gridGap: "2em"
    },
    borderRadius: {
        card: "10px",
        button: "6px",
        input: "4px"
    },
    boxShadow: {
        card: "0 2px 8px rgba(31,58,95,0.08)",
        modal: "0 4px 24px rgba(31,58,95,0.18)"
    },
    transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)"
};

// -------------------- GLOBAL STYLE --------------------
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.typography.body};
    background: ${(props) => props.theme.colors.workshopGray};
    color: ${(props) => props.theme.colors.concreteGray};
    font-size: ${(props) => props.theme.fontSizes.body};
    min-height: 100vh;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  h1, h2, h3 {
    font-family: ${(props) => props.theme.typography.heading};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    color: ${(props) => props.theme.colors.deepBlue};
    margin-top: 0;
  }
  h1 { font-size: ${(props) => props.theme.fontSizes.h1}; }
  h2 { font-size: ${(props) => props.theme.fontSizes.h2}; }
  h3 { font-size: ${(props) => props.theme.fontSizes.h3}; }
  a {
    color: ${(props) => props.theme.colors.deepBlue};
    text-decoration: underline;
    transition: ${(props) => props.theme.transition};
    &:hover {
      color: ${(props) => props.theme.colors.tradeGold};
    }
  }
  button {
    font-family: ${(props) => props.theme.typography.body};
    font-weight: ${(props) => props.theme.fontWeights.heading};
    border: none;
    border-radius: ${(props) => props.theme.borderRadius.button};
    padding: 0.75em 1.5em;
    background: ${(props) => props.theme.colors.tradeGold};
    color: ${(props) => props.theme.colors.deepBlue};
    cursor: pointer;
    transition: ${(props) => props.theme.transition};
    font-size: 1rem;
    &:hover, &:focus {
      background: ${(props) => props.theme.colors.tradeGoldDark};
      box-shadow: 0 2px 8px ${(props) => props.theme.colors.concreteGray}33;
      outline: none;
    }
  }
  input, select, textarea {
    font-family: ${(props) => props.theme.typography.body};
    border: 1px solid ${(props) => props.theme.colors.tradeGold};
    border-radius: ${(props) => props.theme.borderRadius.input};
    padding: 0.5em 1em;
    font-size: 1rem;
    margin-bottom: 1em;
    transition: ${(props) => props.theme.transition};
    &:focus {
      outline: 2px solid ${(props) => props.theme.colors.deepBlue};
      border-color: ${(props) => props.theme.colors.deepBlue};
    }
  }
`;

// -------------------- DATABASE (db.json) --------------------
const db = {
    "$schema": "maain://schema/database",
    courses: [
        {
            id: "course-1",
            name: "EVTC Bathtub, Tile And Vanity Refinishing Course",
            description:
                "The history of bathtub refinishing and its beginning is debatable. Some sources may suggest the service of refinishing bathtubs started in the 1950’s or 1960’s and some sources might argue that it was much earlier. However, the truth about bathtub refinishing is that it’s a specialty. This unique trade requires a lot of training, especially when it comes to the use and handling of chemicals. It’s often said that bathtub refinishing is equivalent to painting a car but without the long hours of sanding primer and pulling out dents. The goal of this special trade is to restore the bathtub, tile, sink and vanity back to its original factory finish as close as possible. Here at EVTC we will teach you the fundamentals and techniques used in bathtub refinishing, training students on industry standard equipment and high-quality commercial grade epoxy primer and polyurethane paint.",
            schedule: "One Week Training Course Of 39 Hours and 15 Minutes Monday- Friday",
            price: 3800,
            priceNote: "USD (Debit Card Only)",
            extraMaterial: {
                description: "Care maintenance, Warranty And Preparation Sheets on PDF File",
                price: 150,
                priceNote: "USD"
            },
            paymentInstructions:
                "No Cash, Credit Cards, Cashier’s Checks, Checks, Money Orders, Bitcoin and Payment Plans Are Not Accepted.",
            available: true,
            availableDate: "2026-09-01",
            lessons: [
                {
                    id: "lesson-1-1",
                    name: "EVTC Bathtub Refinishing Manual",
                    resources: [
                        {
                            id: "res-1-1-1",
                            type: "pdf",
                            name: "Bathtub Refinishing Manual",
                            url: "https://www.evtc.com/resources/bathtub-refinishing-manual.pdf",
                            locked: false
                        }
                    ]
                },
                {
                    id: "lesson-1-2",
                    name: "Refinishing Safety Training",
                    resources: [
                        {
                            id: "res-1-2-1",
                            type: "slides",
                            name: "Safety Training Slides",
                            url: "https://www.evtc.com/resources/safety-training-slides.pdf",
                            locked: false
                        }
                    ]
                },
                {
                    id: "lesson-1-3",
                    name: "Bathtub Minor and Major Repair Practical Training",
                    resources: [
                        {
                            id: "res-1-3-1",
                            type: "slides",
                            name: "Repair Practical Slides",
                            url: "https://www.evtc.com/resources/repair-practical-slides.pdf",
                            locked: false
                        }
                    ]
                },
                {
                    id: "lesson-1-4",
                    name: "Bathtub, Tile And Vanity Refinishing Practical Training",
                    resources: [
                        {
                            id: "res-1-4-1",
                            type: "slides",
                            name: "Refinishing Practical Slides",
                            url: "https://www.evtc.com/resources/refinishing-practical-slides.pdf",
                            locked: false
                        }
                    ]
                },
                {
                    id: "lesson-1-5",
                    name: "Set Up Account With Paint Provider",
                    resources: [
                        {
                            id: "res-1-5-1",
                            type: "link",
                            name: "Create Account",
                            url: "https://www.paintprovider.com/onboarding",
                            locked: false
                        }
                    ]
                },
                {
                    id: "lesson-1-6",
                    name: "Bathtub Refinishing Business Recommendations",
                    resources: [
                        {
                            id: "res-1-6-1",
                            type: "slides",
                            name: "Business Recommendations Slides",
                            url: "https://www.evtc.com/resources/business-recommendations-slides.pdf",
                            locked: false
                        }
                    ]
                },
                {
                    id: "lesson-1-7",
                    name: "Certificate Of Completion",
                    resources: [
                        {
                            id: "res-1-7-1",
                            type: "pdf",
                            name: "Certificate Of Completion",
                            url: "https://www.evtc.com/resources/certificate-of-completion.pdf",
                            locked: true
                        }
                    ]
                }
            ]
        },
        {
            id: "course-2",
            name: "EVTC Countertop and Cabinet Refinishing Course",
            description:
                "Covers countertop repair, countertop refinishing, cabinet repair, and cabinet refinishing.",
            schedule: "TBD",
            price: 2200,
            priceNote: "USD (Debit Card Only)",
            available: false,
            availableDate: "2027-01-01",
            lessons: [
                {
                    id: "lesson-2-1",
                    name: "Countertop Repair",
                    resources: [
                        {
                            id: "res-2-1-1",
                            type: "pdf",
                            name: "Countertop Repair Guide",
                            url: "https://www.evtc.com/resources/countertop-repair-guide.pdf",
                            locked: true
                        }
                    ]
                },
                {
                    id: "lesson-2-2",
                    name: "Countertop Refinishing",
                    resources: [
                        {
                            id: "res-2-2-1",
                            type: "video",
                            name: "Countertop Refinishing Video",
                            url: "https://www.youtube.com/embed/EVTC-countertop",
                            locked: true
                        }
                    ]
                },
                {
                    id: "lesson-2-3",
                    name: "Cabinet Repair",
                    resources: [
                        {
                            id: "res-2-3-1",
                            type: "pdf",
                            name: "Cabinet Repair Guide",
                            url: "https://www.evtc.com/resources/cabinet-repair-guide.pdf",
                            locked: true
                        }
                    ]
                },
                {
                    id: "lesson-2-4",
                    name: "Cabinet Refinishing",
                    resources: [
                        {
                            id: "res-2-4-1",
                            type: "slides",
                            name: "Cabinet Refinishing Slides",
                            url: "https://www.evtc.com/resources/cabinet-refinishing-slides.pdf",
                            locked: true
                        }
                    ]
                }
            ]
        },
        {
            id: "course-3",
            name: "EVTC Maintenance Course",
            description:
                "Lessons in interior wall and trim repair and painting, carpet restoration and cleaning, and water damage category 1 extraction and treatment.",
            schedule: "TBD",
            price: 1800,
            priceNote: "USD (Debit Card Only)",
            available: false,
            availableDate: "2027-03-01",
            lessons: [
                {
                    id: "lesson-3-1",
                    name: "Interior Wall and Trim Repair and Painting",
                    resources: [
                        {
                            id: "res-3-1-1",
                            type: "pdf",
                            name: "Wall and Trim Guide",
                            url: "https://www.evtc.com/resources/wall-trim-guide.pdf",
                            locked: true
                        }
                    ]
                },
                {
                    id: "lesson-3-2",
                    name: "Carpet Restoration and Cleaning",
                    resources: [
                        {
                            id: "res-3-2-1",
                            type: "video",
                            name: "Carpet Cleaning Video",
                            url: "https://www.youtube.com/embed/EVTC-carpet",
                            locked: true
                        }
                    ]
                },
                {
                    id: "lesson-3-3",
                    name: "Water Damage Category 1 Extraction and Treatment",
                    resources: [
                        {
                            id: "res-3-3-1",
                            type: "slides",
                            name: "Water Damage Slides",
                            url: "https://www.evtc.com/resources/water-damage-slides.pdf",
                            locked: true
                        }
                    ]
                }
            ]
        },
        {
            id: "course-4",
            name: "EVTC Drywall Install Training Course",
            description:
                "Includes drywall demo, drywall install, primer and paint lessons.",
            schedule: "TBD",
            price: 1600,
            priceNote: "USD (Debit Card Only)",
            available: false,
            availableDate: "2027-05-01",
            lessons: [
                {
                    id: "lesson-4-1",
                    name: "Drywall Demo",
                    resources: [
                        {
                            id: "res-4-1-1",
                            type: "video",
                            name: "Drywall Demo Video",
                            url: "https://www.youtube.com/embed/EVTC-drywall-demo",
                            locked: true
                        }
                    ]
                },
                {
                    id: "lesson-4-2",
                    name: "Drywall Install",
                    resources: [
                        {
                            id: "res-4-2-1",
                            type: "pdf",
                            name: "Drywall Install Guide",
                            url: "https://www.evtc.com/resources/drywall-install-guide.pdf",
                            locked: true
                        }
                    ]
                },
                {
                    id: "lesson-4-3",
                    name: "Primer and Paint",
                    resources: [
                        {
                            id: "res-4-3-1",
                            type: "slides",
                            name: "Primer and Paint Slides",
                            url: "https://www.evtc.com/resources/primer-paint-slides.pdf",
                            locked: true
                        }
                    ]
                }
            ]
        },
        {
            id: "course-5",
            name: "EVTC Business Course (Coming Soon)",
            description: "Business skills for home improvement professionals. Coming soon.",
            schedule: "TBD",
            price: 0,
            priceNote: "TBD",
            available: false,
            availableDate: "2028-01-01",
            lessons: []
        }
    ],
    students: [
        {
            id: "student-1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@email.com",
            registeredAt: "2024-06-01T10:00:00Z"
        }
    ],
    registrations: [
        {
            id: "reg-1",
            studentId: "student-1",
            courseId: "course-1",
            registeredAt: "2024-06-01T10:00:00Z"
        }
    ],
    payments: [
        {
            id: "pay-1",
            registrationId: "reg-1",
            amount: 3800,
            paidAt: "2024-06-01T10:05:00Z",
            method: "debit_card"
        }
    ],
    about: {
        heading: "Welcome to Elite Vocational Training Center",
        body: "EVTC is a private trade school located in the Central Pennsylvania area and is dedicated to training students in home improvement. It’s our mission to provide the best quality of education and practical training to our students from EVTC instructors, who are certified refinishing and restoration technicians, with ten plus years of experience. We believe that it’s our responsibility to share the knowledge to the next generation of Home Improvement Professionals."
    },
    contact: {
        email: "elitehigherlearning@gmail.com"
    }
};

// -------------------- SVG HERO ILLUSTRATION --------------------
const HeroSVG = () => (
    <svg
        width="320"
        height="120"
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-component="HeroSVG"
        aria-hidden="true"
        style={{ display: "block", margin: "0 auto" }}
    >
        <rect x="0" y="0" width="320" height="120" rx="20" fill="#F4F4F4" />
        <rect x="20" y="40" width="60" height="40" rx="8" fill="#1F3A5F" />
        <rect x="100" y="40" width="60" height="40" rx="8" fill="#C9A227" />
        <rect x="180" y="40" width="60" height="40" rx="8" fill="#6E6E6E" />
        <circle cx="270" cy="60" r="20" fill="#C9A227" />
        <rect x="260" y="50" width="20" height="20" rx="4" fill="#F4F4F4" />
        <text x="30" y="70" fontFamily="Roboto Slab, serif" fontSize="18" fill="#FFF">
            EVTC
        </text>
    </svg>
);

// -------------------- STYLED COMPONENTS --------------------
const AppContainer = styled.div.attrs({ "data-component": "AppContainer" })`
  min-height: 100vh;
  width: 100vw;
  background: ${(p) => p.theme.colors.workshopGray};
`;
const Header = styled.header.attrs({ "data-component": "Header" })`
  background: ${(p) => p.theme.colors.deepBlue};
  color: ${(p) => p.theme.colors.white};
  padding: 1.5em 0 0.5em 0;
  text-align: center;
`;
const NavBar = styled.nav.attrs({ "data-component": "NavBar" })`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) => p.theme.colors.deepBlue};
  padding: 0.5em 0;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Tabs = styled.ul.attrs({ "data-component": "Tabs" })`
  display: flex;
  gap: 2em;
  margin: 0;
  padding: 0;
  list-style: none;
`;
const Tab = styled.li.attrs({ "data-component": "Tab" }) <{
    active?: boolean;
}>`
  color: ${(p) => p.theme.colors.white};
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5em 1em;
  border-bottom: 4px solid
    ${(p) => (p.active ? p.theme.colors.tradeGold : "transparent")};
  transition: ${(p) => p.theme.transition};
  &:hover {
    color: ${(p) => p.theme.colors.tradeGold};
  }
`;
const Dropdown = styled.div.attrs({ "data-component": "Dropdown" })`
  position: relative;
  display: inline-block;
`;
const DropdownButton = styled.button.attrs({ "data-component": "DropdownButton" })`
  background: none;
  color: ${(p) => p.theme.colors.white};
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover, &:focus {
    color: ${(p) => p.theme.colors.tradeGold};
    outline: none;
  }
`;
const DropdownMenu = styled.ul.attrs({ "data-component": "DropdownMenu" }) <{
    open: boolean;
}>`
  display: ${(p) => (p.open ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 260px;
  background: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.deepBlue};
  box-shadow: ${(p) => p.theme.boxShadow.card};
  border-radius: ${(p) => p.theme.borderRadius.card};
  margin: 0;
  padding: 0.5em 0;
  z-index: 20;
  list-style: none;
  animation: ${(p) =>
        p.open
            ? css`
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        `
            : "none"};
`;
const DropdownItem = styled.li.attrs({ "data-component": "DropdownItem" })`
  padding: 0.75em 1.5em;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: ${(p) => p.theme.colors.tradeGold};
    color: ${(p) => p.theme.colors.deepBlue};
  }
`;
const Main = styled.main.attrs({ "data-component": "Main" })`
  max-width: 900px;
  margin: 2em auto;
  padding: 0 1em;
`;
const Section = styled.section.attrs({ "data-component": "Section" })`
  background: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius.card};
  box-shadow: ${(p) => p.theme.boxShadow.card};
  padding: ${(p) => p.theme.spacing.card};
  margin-bottom: 2em;
`;
const CourseCard = styled.div.attrs({ "data-component": "CourseCard" })`
  background: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius.card};
  box-shadow: ${(p) => p.theme.boxShadow.card};
  padding: 1.5em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const LessonList = styled.ul.attrs({ "data-component": "LessonList" })`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const LessonItem = styled.li.attrs({ "data-component": "LessonItem" })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 0;
  border-bottom: 1px solid ${(p) => p.theme.colors.workshopGray};
  &:last-child { border-bottom: none; }
`;
const ResourceTypeIcon = styled.span.attrs({ "data-component": "ResourceTypeIcon" })`
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.5em;
`;
const ModalOverlay = styled.div.attrs({ "data-component": "ModalOverlay" })`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(31,58,95,0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${css`
    from { opacity: 0; }
    to { opacity: 1; }
  `};
`;
const ModalContent = styled.div.attrs({ "data-component": "ModalContent" })`
  background: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius.card};
  box-shadow: ${(p) => p.theme.boxShadow.modal};
  padding: 2em;
  max-width: 600px;
  width: 100%;
  position: relative;
`;
const CloseButton = styled.button.attrs({ "data-component": "CloseButton" })`
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  color: ${(p) => p.theme.colors.deepBlue};
  font-size: 1.4em;
  padding: 0.2em 0.5em;
  border: none;
  cursor: pointer;
`;
const Form = styled.form.attrs({ "data-component": "Form" })`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const FormRow = styled.div.attrs({ "data-component": "FormRow" })`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
const Label = styled.label.attrs({ "data-component": "Label" })`
  color: ${(p) => p.theme.colors.concreteGray};
  font-weight: 600;
  margin-bottom: 0.2em;
`;
const ErrorMsg = styled.div.attrs({ "data-component": "ErrorMsg" })`
  color: #b00020;
  font-size: 0.95em;
`;
const Stepper = styled.div.attrs({ "data-component": "Stepper" })`
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
`;
const Step = styled.div.attrs({ "data-component": "Step" }) <{
    active?: boolean;
}>`
  font-weight: ${(p) => (p.active ? 700 : 400)};
  color: ${(p) => (p.active ? p.theme.colors.tradeGold : p.theme.colors.concreteGray)};
`;
const ButtonRow = styled.div.attrs({ "data-component": "ButtonRow" })`
  display: flex;
  gap: 1em;
  justify-content: flex-end;
  margin-top: 1.5em;
`;
const LockIcon = () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" data-component="LockIcon" aria-label="Locked">
        <rect x="4" y="7" width="8" height="5" rx="1.5" fill="#C9A227" stroke="#1F3A5F" />
        <path d="M8 7V5.5A2.5 2.5 0 0 1 13 5.5V7" stroke="#1F3A5F" strokeWidth="1.2" />
        <circle cx="8" cy="10" r="1" fill="#1F3A5F" />
    </svg>
);

// -------------------- RESOURCE VIEWERS --------------------
function ResourceViewer({ resource }: { resource: any }) {
    if (resource.type === "pdf" || resource.type === "slides") {
        return (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" data-component="ResourceLink">
                {resource.name} (PDF/Slides)
            </a>
        );
    } else if (resource.type === "video") {
        return (
            <iframe
                title={resource.name}
                src={resource.url}
                width="100%"
                height="315"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-component="ResourceVideo"
                style={{ border: "none", borderRadius: "8px", margin: "0.5em 0" }}
            />
        );
    } else if (resource.type === "link") {
        return (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" data-component="ResourceLink">
                {resource.name}
            </a>
        );
    } else {
        return <span data-component="ResourceUnknown">Unknown Resource</span>;
    }
}

function ResourceType({ type }: { type: string }) {
    if (type === "pdf") return <ResourceTypeIcon>📄</ResourceTypeIcon>;
    if (type === "slides") return <ResourceTypeIcon>🖼️</ResourceTypeIcon>;
    if (type === "video") return <ResourceTypeIcon>🎥</ResourceTypeIcon>;
    if (type === "link") return <ResourceTypeIcon>🔗</ResourceTypeIcon>;
    return <ResourceTypeIcon>❓</ResourceTypeIcon>;
}

// -------------------- MODAL --------------------
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
    if (!open) return null;
    return (
        <ModalOverlay data-component="ModalOverlay" onClick={onClose}>
            <ModalContent data-component="ModalContent" onClick={e => e.stopPropagation()}>
                <CloseButton data-component="CloseButton" onClick={onClose} aria-label="Close">×</CloseButton>
                <h2 data-component="ModalTitle">{title}</h2>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
}

// -------------------- REGISTRATION/ONBOARDING FORM --------------------
function RegistrationForm({ courses, onRegister }: { courses: any[]; onRegister: (student: any, courseId: string) => void }) {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", courseId: "", agree: false });
    const [errors, setErrors] = useState<any>({});
    const [submitted, setSubmitted] = useState(false);

    const steps = ["Personal Info", "Select Course", "Payment", "Confirmation"];

    function validate() {
        const errs: any = {};
        if (step === 0) {
            if (!form.firstName) errs.firstName = "First name required";
            if (!form.lastName) errs.lastName = "Last name required";
            if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Valid email required";
        } else if (step === 1) {
            if (!form.courseId) errs.courseId = "Please select a course";
        } else if (step === 2) {
            if (!form.agree) errs.agree = "You must agree to payment instructions";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function next() {
        if (validate()) setStep(step + 1);
    }
    function prev() {
        setStep(Math.max(0, step - 1));
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type, checked } = e.target;
        setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            onRegister({ ...form }, form.courseId);
            setStep(3);
        }
    }

    const selectedCourse = courses.find(c => c.id === form.courseId);

    return (
        <Section data-component="RegistrationSection">
            <h2 data-component="RegistrationHeading">Student Registration & Onboarding</h2>
            <Stepper data-component="Stepper">
                {steps.map((s, i) => (
                    <Step key={s} active={i === step} data-component="Step">
                        {i + 1}. {s}
                    </Step>
                ))}
            </Stepper>
            <Form data-component="Form" onSubmit={handleSubmit}>
                {step === 0 && (
                    <>
                        <FormRow data-component="FormRow">
                            <Label htmlFor="firstName">First Name</Label>
                            <input name="firstName" value={form.firstName} onChange={handleChange} autoComplete="given-name" />
                            {errors.firstName && <ErrorMsg>{errors.firstName}</ErrorMsg>}
                        </FormRow>
                        <FormRow data-component="FormRow">
                            <Label htmlFor="lastName">Last Name</Label>
                            <input name="lastName" value={form.lastName} onChange={handleChange} autoComplete="family-name" />
                            {errors.lastName && <ErrorMsg>{errors.lastName}</ErrorMsg>}
                        </FormRow>
                        <FormRow data-component="FormRow">
                            <Label htmlFor="email">Email</Label>
                            <input name="email" value={form.email} onChange={handleChange} type="email" autoComplete="email" />
                            {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                        </FormRow>
                    </>
                )}
                {step === 1 && (
                    <FormRow data-component="FormRow">
                        <Label htmlFor="courseId">Select Course</Label>
                        <select name="courseId" value={form.courseId} onChange={handleChange}>
                            <option value="">-- Select --</option>
                            {courses.filter(c => c.available).map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name} ({c.price > 0 ? `$${c.price.toLocaleString()} USD` : "TBD"})
                                </option>
                            ))}
                        </select>
                        {errors.courseId && <ErrorMsg>{errors.courseId}</ErrorMsg>}
                    </FormRow>
                )}
                {step === 2 && selectedCourse && (
                    <FormRow data-component="FormRow">
                        <Label>Payment Instructions</Label>
                        <div>
                            <strong>Course:</strong> {selectedCourse.name}
                            <br />
                            <strong>Price:</strong> ${selectedCourse.price.toLocaleString()} USD (Debit Card Only)
                            <br />
                            <strong>Extra Material:</strong> {selectedCourse.extraMaterial?.description} (${selectedCourse.extraMaterial?.price} USD)
                            <br />
                            <strong>Instructions:</strong> {selectedCourse.paymentInstructions}
                        </div>
                        <label style={{ marginTop: "1em" }}>
                            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} /> I agree to the payment instructions
                        </label>
                        {errors.agree && <ErrorMsg>{errors.agree}</ErrorMsg>}
                    </FormRow>
                )}
                {step === 3 && submitted && (
                    <Section data-component="ConfirmationSection">
                        <h3>Registration Complete!</h3>
                        <p>Thank you, {form.firstName}. You have registered for the {selectedCourse?.name}.</p>
                        <p>We have sent a confirmation to {form.email}.</p>
                    </Section>
                )}
                <ButtonRow data-component="ButtonRow">
                    {step > 0 && step < 3 && (
                        <button type="button" onClick={prev} data-component="PrevButton">
                            Previous
                        </button>
                    )}
                    {step < 2 && (
                        <button type="button" onClick={next} data-component="NextButton">
                            Next
                        </button>
                    )}
                    {step === 2 && (
                        <button type="submit" data-component="SubmitButton">Submit Registration</button>
                    )}
                </ButtonRow>
            </Form>
        </Section>
    );
}

// -------------------- MAIN APP --------------------
const TABS = [
    { key: "about", label: "About Us" },
    { key: "courses", label: "Training Courses" },
    { key: "contact", label: "Contact Us" },
    { key: "registration", label: "Registration/Onboarding" }
];

function App() {
    // State
    const [tab, setTab] = useState("about");
    const [courseDropdown, setCourseDropdown] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [lessonModal, setLessonModal] = useState<{ course: any; lesson: any } | null>(null);
    const [students, setStudents] = useState(db.students);
    const [registrations, setRegistrations] = useState(db.registrations);

    // Course and lesson helpers
    const courses = useMemo(() => db.courses, []);
    const selectedCourse = courses.find(c => c.id === selectedCourseId);

    // Handlers
    function handleTab(key: string) {
        setTab(key);
        setSelectedCourseId(null);
        setCourseDropdown(false);
    }
    function handleCourseClick(id: string) {
        setSelectedCourseId(id);
        setTab("courses");
        setCourseDropdown(false);
    }
    function handleLessonClick(course: any, lesson: any) {
        setLessonModal({ course, lesson });
    }
    function handleRegister(student: any, courseId: string) {
        // Add student and registration to state (demo only)
        const newStudent = { ...student, id: `student-${students.length + 1}`, registeredAt: new Date().toISOString() };
        setStudents([...students, newStudent]);
        setRegistrations([
            ...registrations,
            {
                id: `reg-${registrations.length + 1}`,
                studentId: newStudent.id,
                courseId,
                registeredAt: new Date().toISOString()
            }
        ]);
    }

    // Responsive nav: close dropdown on outside click
    React.useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if ((e.target as HTMLElement).closest('[data-component="Dropdown"]') == null) {
                setCourseDropdown(false);
            }
        }
        if (courseDropdown) {
            document.addEventListener("mousedown", onDocClick);
            return () => document.removeEventListener("mousedown", onDocClick);
        }
    }, [courseDropdown]);

    // -------------------- RENDER --------------------
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppContainer data-component="AppContainer">
                <Header data-component="Header">
                    <h1 data-component="SiteTitle" style={{ marginBottom: 0 }}>Elite Vocational Training Center</h1>
                    <div style={{ margin: "0.5em 0 0.5em 0" }}><HeroSVG /></div>
                </Header>
                <NavBar data-component="NavBar">
                    <Tabs data-component="Tabs">
                        {TABS.map(tabItem =>
                            tabItem.key === "courses" ? (
                                <Dropdown data-component="Dropdown" key={tabItem.key}>
                                    <DropdownButton
                                        data-component="DropdownButton"
                                        aria-haspopup="listbox"
                                        aria-expanded={courseDropdown}
                                        onClick={() => setCourseDropdown(open => !open)}
                                    >
                                        {tabItem.label} ▾
                                    </DropdownButton>
                                    <DropdownMenu data-component="DropdownMenu" open={courseDropdown} role="listbox">
                                        {courses.map(c => (
                                            <DropdownItem
                                                data-component="DropdownItem"
                                                key={c.id}
                                                onClick={() => handleCourseClick(c.id)}
                                                aria-selected={selectedCourseId === c.id}
                                            >
                                                {c.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <Tab
                                    data-component="Tab"
                                    key={tabItem.key}
                                    active={tab === tabItem.key && !selectedCourseId}
                                    onClick={() => handleTab(tabItem.key)}
                                    aria-current={tab === tabItem.key ? "page" : undefined}
                                >
                                    {tabItem.label}
                                </Tab>
                            )
                        )}
                    </Tabs>
                </NavBar>
                <Main data-component="Main">
                    {/* About Us */}
                    {tab === "about" && (
                        <Section data-component="AboutSection">
                            <h2 data-component="AboutHeading">{db.about.heading}</h2>
                            <p data-component="AboutBody">{db.about.body}</p>
                        </Section>
                    )}

                    {/* Contact Us */}
                    {tab === "contact" && (
                        <Section data-component="ContactSection">
                            <h2 data-component="ContactHeading">Contact Us</h2>
                            <p data-component="ContactEmail">
                                <strong>Email:</strong> <a href="mailto:elitehigherlearning@gmail.com">elitehigherlearning@gmail.com</a>
                            </p>
                        </Section>
                    )}

                    {/* Registration/Onboarding */}
                    {tab === "registration" && (
                        <RegistrationForm courses={courses} onRegister={handleRegister} />
                    )}

                    {/* Courses List or Course Detail */}
                    {tab === "courses" && !selectedCourseId && (
                        <Section data-component="CoursesSection">
                            <h2 data-component="CoursesHeading">Training Courses</h2>
                            {courses.map(course => (
                                <CourseCard key={course.id} data-component="CourseCard">
                                    <h3 data-component="CourseName">{course.name}</h3>
                                    <p data-component="CourseDesc">{course.description}</p>
                                    <div data-component="CourseMeta">
                                        <strong>Schedule:</strong> {course.schedule} <br />
                                        <strong>Price:</strong> {course.price > 0 ? `$${course.price.toLocaleString()} USD` : "TBD"}
                                    </div>
                                    <button
                                        data-component="ViewCourseButton"
                                        onClick={() => handleCourseClick(course.id)}
                                    >
                                        View Course Details
                                    </button>
                                </CourseCard>
                            ))}
                        </Section>
                    )}
                    {tab === "courses" && selectedCourse && (
                        <Section data-component="CourseDetailSection">
                            <button
                                data-component="BackToCoursesButton"
                                style={{ marginBottom: "1em" }}
                                onClick={() => setSelectedCourseId(null)}
                            >
                                ← Back to Courses
                            </button>
                            <h2 data-component="CourseDetailName">{selectedCourse.name}</h2>
                            <p data-component="CourseDetailDesc">{selectedCourse.description}</p>
                            <div data-component="CourseDetailMeta">
                                <strong>Schedule:</strong> {selectedCourse.schedule} <br />
                                <strong>Price:</strong> {selectedCourse.price > 0 ? `$${selectedCourse.price.toLocaleString()} USD` : "TBD"}
                                {selectedCourse.extraMaterial && (
                                    <>
                                        <br />
                                        <strong>Extra Material:</strong> {selectedCourse.extraMaterial.description} (${selectedCourse.extraMaterial.price} USD)
                                    </>
                                )}
                                <br />
                                <strong>Available:</strong> {selectedCourse.available ? "Yes" : `From ${selectedCourse.availableDate}`}
                                <br />
                                <strong>Payment:</strong> {selectedCourse.paymentInstructions}
                            </div>
                            <h3 data-component="CourseLessonsHeading">Lessons</h3>
                            <LessonList data-component="LessonList">
                                {selectedCourse.lessons.length === 0 && <li>No lessons yet.</li>}
                                {selectedCourse.lessons.map(lesson => (
                                    <LessonItem key={lesson.id} data-component="LessonItem">
                                        <span>
                                            {lesson.name}
                                            {lesson.resources.some((r: any) => r.locked) && (
                                                <span title="Some resources locked"> <LockIcon /></span>
                                            )}
                                        </span>
                                        <button
                                            data-component="ViewLessonButton"
                                            onClick={() => handleLessonClick(selectedCourse, lesson)}
                                        >
                                            View Resources
                                        </button>
                                    </LessonItem>
                                ))}
                            </LessonList>
                        </Section>
                    )}
                </Main>
                {/* Lesson Modal */}
                {lessonModal && (
                    <Modal
                        open={!!lessonModal}
                        onClose={() => setLessonModal(null)}
                        title={lessonModal.lesson.name}
                    >
                        <ul data-component="ResourceList" style={{ padding: 0, listStyle: "none" }}>
                            {lessonModal.lesson.resources.map((resource: any) => (
                                <li key={resource.id} style={{ marginBottom: "1.5em" }} data-component="ResourceItem">
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
                                        <ResourceType type={resource.type} />
                                        <span style={{ fontWeight: 600 }}>{resource.name}</span>
                                        {resource.locked && (
                                            <span title="Locked"><LockIcon /></span>
                                        )}
                                    </div>
                                    <div style={{ marginLeft: "2em", marginTop: "0.5em" }}>
                                        {resource.locked ? (
                                            <span style={{ color: theme.colors.concreteGray }}>
                                                This resource is locked. Please register and complete payment to access.
                                            </span>
                                        ) : (
                                            <ResourceViewer resource={resource} />
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Modal>
                )}
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;
