import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";

const UpdateDNS = () => {
  const [buttonStatus, setButtonStatus] = useState("");

  let status = () => {
    if (buttonStatus === "ok") {
      return <img src="success.png" alt="ok" width="30" height="30" />;
    } else if (buttonStatus === "nok") {
      return <p>DNS API update was unsuccesful</p>;
    } else {
      return null;
    }
  };

  async function buttonClick() {
    try {
      const res = await fetch("http://localhost:8080/api/updateDNS", {
        method: "POST",
      });

      const json = await res.json();

      if (Object.keys(json).length) {
        setButtonStatus("ok");
      } else {
        setButtonStatus("nok");
      }
    } catch (e) {
      setButtonStatus("nok");
      console.log(e);
    }
  }

  return (
    <>
      <h3>Steps to replicate the issue</h3>
      <ol>
        <li>
          The dig command below can be used to check if the DNS TXT record on
          both the primary and secondary DNS server are matching
          <p>
            <pre
              css={css`
                display: block;
                white-space: pre;
                -webkit-overflow-scrolling: touch;
                max-width: 100%;
                min-width: 100px;
                white-space: pre-wrap; /* css-3 */
                white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
                white-space: -pre-wrap; /* Opera 4-6 */
                white-space: -o-pre-wrap; /* Opera 7 */
                word-wrap: break-word; /* Internet Explorer 5.5+ */
                background: #f4f4f4;
                border: 1px solid #ddd;
                border-left: 3px solid #009b77;
                color: #666;
                page-break-inside: avoid;
                font-family: monospace;
                font-size: 15px;
                line-height: 1.6;
                margin-bottom: 1.6em;
                overflow: auto;
                padding: 1em 1.5em;
                word-wrap: break-word;
              `}
            >
              <code>dig -t TXT @DNS_SERVER_IP domain.com</code>
            </pre>
          </p>
        </li>
        <li>
          (optional) If the primary DNS and secondary DNS are showing matching
          DNS TXT record, click on the button below to update the TXT record
          with the current datetime "YYYYMMDDSS" on the primary DNS server
          <p>
            <button
              css={css`
                span {
                  padding: 0.5em;
                  display: inline-block;
                }
              `}
              onClick={buttonClick}
            >
              <span>Update DNS TXT record</span>
            </button>
            <span>{status()}</span>
          </p>
        </li>

        <li>
          Initiate a zone transfer and check whether the zone data is updated on
          the secondary DNS server
        </li>
      </ol>
    </>
  );
};

export default UpdateDNS;
