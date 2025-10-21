"use client";
import { Typography, Button } from "@mui/material";
import { CheckCircle, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="form-wrapper">
      <div className="form-content">
        <div className="my-3" style={{ marginBottom: "24px" }}>
          {/* Success Icon */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <CheckCircle
              size={80}
              style={{
                color: "var(--primary-color)",
                marginBottom: "16px"
              }}
            />
          </div>

          {/* Main Heading */}
          <Typography
            variant="h3"
            style={{
              marginBottom: "16px",
              textAlign: "center",
              color: "var(--dark-gray)"
            }}
          >
            Ihre Daten wurden erfolgreich übermittelt!
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h6"
            style={{
              marginBottom: "24px",
              textAlign: "center",
              color: "var(--primary-color)",
              fontWeight: 500
            }}
          >
            Datenübertragung abgeschlossen
          </Typography>

          {/* Main Content */}
          <div style={{
            backgroundColor: "var(--light-gray)",
            padding: "24px",
            borderRadius: "8px",
            marginBottom: "24px"
          }}>
            <Typography variant="body1" style={{ marginBottom: "16px" }}>
              Sie erhalten in den nächsten 24 Stunden eine separate
              Bestätigung inkl. Ihrer Angaben im PDF-Format per E-Mail
              von uns. Alle Daten können Sie ab sofort über Ihre Wallet
              abrufen und verwenden.
            </Typography>

            <Typography variant="body1" style={{ marginBottom: "16px" }}>
              <strong>Was passiert als Nächstes:</strong>
            </Typography>

            <ul style={{
              paddingLeft: "20px",
              marginBottom: "16px",
              color: "var(--dark-gray)"
            }}>
              <li style={{ marginBottom: "8px" }}>
                Wir prüfen Ihre übermittelten Daten
              </li>
              <li style={{ marginBottom: "8px" }}>
                Sie erhalten eine E-Mail-Bestätigung mit allen Details
              </li>
              <li style={{ marginBottom: "8px" }}>
                Bei Rückfragen kontaktieren wir Sie direkt
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div style={{
            border: "1px solid var(--primary-color)",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "var(--primary-color-light--50)"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
              <FileText
                size={20}
                style={{
                  color: "var(--primary-color)",
                  marginRight: "8px"
                }}
              />
              <Typography variant="body2" style={{ fontWeight: 500 }}>
                Wichtiger Hinweis
              </Typography>
            </div>
            <Typography variant="body2">
              Bitte bewahren Sie die E-Mail-Bestätigung gut auf.
              Diese benötigen Sie für weitere Schritte in der Schadensabwicklung.
            </Typography>
          </div>
        </div>
      </div>

      <div className="navigation-container">
        <Button
          variant="contained"
          className="next-button"
          onClick={() => router.push("")}
          style={{ marginBottom: "12px" }}
        >
          Zurück zur Startseite
        </Button>

        <Button
          variant="outlined"
          style={{
            width: "100%",
            borderColor: "var(--primary-color)",
            color: "var(--primary-color)",
            borderRadius: "30px",
            textTransform: "none",
            padding: "12px"
          }}
          onClick={() => window.open("https://wallet.example.com", "_blank")}
        >
          <FileText size={20} style={{ marginRight: "8px" }} />
          Weiter zur Wallet
        </Button>
      </div>
    </div>
  );
}
