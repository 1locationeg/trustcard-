import { messages } from "@/constants/messages"

export function useTranslations(namespace: string) {
  const parts = namespace.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = messages;
  for (const part of parts) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      current = undefined;
      break;
    }
  }

  const t = (key: string, variables?: Record<string, string | number>) => {
    let text = current?.[key];
    if (text === undefined) {
      // Sometimes keys are nested like 'items.buildTrust.title' inside the t() function
      const subParts = key.split('.');
      let subCurrent = current;
      for (const sp of subParts) {
        if (subCurrent && subCurrent[sp] !== undefined) {
          subCurrent = subCurrent[sp];
        } else {
          subCurrent = undefined;
          break;
        }
      }
      text = subCurrent || key;
    }

    if (variables && typeof text === 'string') {
      for (const [k, v] of Object.entries(variables)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  }

  t.raw = (key: string) => {
    let text = current?.[key];
    if (text === undefined) {
      const subParts = key.split('.');
      let subCurrent = current;
      for (const sp of subParts) {
        if (subCurrent && subCurrent[sp] !== undefined) {
          subCurrent = subCurrent[sp];
        } else {
          subCurrent = undefined;
          break;
        }
      }
      text = subCurrent || key;
    }
    return text;
  };

  t.rich = (key: string) => {
    return t(key);
  };

  return t;
}
