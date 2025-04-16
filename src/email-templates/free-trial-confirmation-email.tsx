import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface FreeTrialConfirmationEmailProps {
  studentName: string;
  teacherName: string;
  sessionDate: string;
  sessionTime: string;
  sessionSubject: string;
  confirmationLink: string;
}

export const FreeTrialConfirmationEmail = ({
  studentName = "Alex",
  teacherName = "Ms. Johnson",
  sessionDate = "Monday, April 21, 2025",
  sessionTime = "4:00 PM - 5:00 PM",
  sessionSubject = "Mathematics",
  confirmationLink = "https://schaefertutor.com/confirm/session123",
}: FreeTrialConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Your Free Trial Session with Schaefer Tutor has been approved!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={header}>Schaefer Tutor</Heading>
          <Hr style={hr} />
          <Section style={section}>
            <Text style={paragraph}>Hey {studentName},</Text>
            <Text style={paragraph}>
              Great news! Your free trial request has been accepted by{" "}
              {teacherName}.
            </Text>

            <Section style={detailsContainer}>
              <Text style={detailHeading}>Session Details:</Text>
              <Text style={detailItem}>
                <strong>Date:</strong> {sessionDate}
              </Text>
              <Text style={detailItem}>
                <strong>Time:</strong> {sessionTime}
              </Text>
              <Text style={detailItem}>
                <strong>Subject:</strong> {sessionSubject}
              </Text>
            </Section>

            <Text style={paragraph}>
              Please confirm your attendance by clicking the button below:
            </Text>

            <Button href={confirmationLink} style={button}>
              Confirm Attendance
            </Button>

            <Text style={paragraph}>
              If you have any questions or need to reschedule, please reply to
              this email or call us at (555) 123-4567.
            </Text>

            <Text style={paragraph}>
              We&apos;re looking forward to helping you achieve your academic
              goals!
            </Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              The Schaefer Tutor Team
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            © 2025 Schaefer Tutor. All rights reserved.
            <br />
            123 Education Lane, Learning City, ED 12345
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default FreeTrialConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const section = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
};

const detailsContainer = {
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "5px",
  margin: "20px 0",
};

const detailHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const detailItem = {
  margin: "5px 0",
  fontSize: "16px",
};

const button = {
  backgroundColor: "#4F46E5",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 20px",
  margin: "30px auto",
  width: "200px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "22px",
  textAlign: "center" as const,
  margin: "20px 0",
};
