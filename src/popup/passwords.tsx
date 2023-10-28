import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import browser from "webextension-polyfill";
import { useCurrentTab } from "./hooks";
import { LoadingView } from "./loading";
import { ErrorCode, ErrorView } from "./error";
import { KeyIcon } from "./icons/key";
import styles from "./passwords.module.scss";

interface LoginName {
  username: string;
  sites: string[];
}

export function PasswordsView() {
  const tab = useCurrentTab();
  const [loginNames, setLoginNames] = useState<LoginName[]>();
  const [error, setError] = useState<ErrorCode>();

  const fetchLoginNames = async (tabId: number, url: string) => {
    setLoginNames(undefined);
    setError(undefined);

    if (new URL(url).hostname === "") return;

    try {
      const loginNames = await browser.runtime.sendMessage({
        cmd: "GET_LOGIN_NAMES_FOR_URL",
        tabId,
        url,
      });

      setLoginNames(loginNames);
    } catch (e: any) {
      setError(e);
    }
  };

  useEffect(() => {
    if (tab?.id === undefined || tab?.url === undefined) return;

    // Refresh passwords list every time the URL changes
    fetchLoginNames(tab.id, tab.url);
  }, [tab?.url]);

  const handleAutoFillPassword = async (loginName: LoginName) => {
    if (tab?.id === undefined || tab?.url === undefined) return;

    setError(undefined);

    try {
      // Can't use GET_PASSWORD_FOR_LOGIN_NAME here
      // See https://bugzilla.mozilla.org/show_bug.cgi?id=1292701
      await browser.runtime.sendMessage({
        cmd: "AUTO_FILL_PASSWORD",
        tabId: tab.id,
        url: tab.url,
        loginName,
      });
    } catch (e: any) {
      setError(e);
    }
  };

  const handleLock = async () => {
    setError(undefined);

    try {
      await browser.runtime.sendMessage({
        cmd: "LOCK",
      });

      // We don't want to show the challenge view right away, so we close the extension instead
      // Next time the user opens the extension, they will see the challenge view automatically
      window.close();
    } catch (e: any) {
      setError(e);
    }
  };

  if (error !== undefined) return <ErrorView code={error} />;
  if (tab?.id === undefined || tab?.url === undefined) return <LoadingView />;
  if (new URL(tab.url).hostname === "")
    return <ErrorView code={ErrorCode.URL_NOT_COMPATIBLE} />;
  if (loginNames === undefined) return <LoadingView />;

  return (
    <div className={styles.passwords}>
      <header>
        <img src="/images/PasswordsExtensionIcon_32.png" alt="" />
        <h1>iCloud Passwords</h1>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLock();
          }}
        >
          Lock
        </a>
      </header>

      {loginNames.length > 0 ? (
        <>
          <h2>Choose a saved password to use:</h2>

          <ul>
            {loginNames?.map((loginName, i) => (
              <li
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  handleAutoFillPassword(loginName);
                }}
              >
                <KeyIcon />
                <div>
                  <span>{loginName.username}</span>
                  <span>{loginName.sites[0] ?? ""}</span>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          <br />
          No passwords saved on this website.
          <br />
          <br />
        </p>
      )}

      <hr />

      <p>
        <Link to="/generate">Create Strong Password...</Link>
      </p>
    </div>
  );
}