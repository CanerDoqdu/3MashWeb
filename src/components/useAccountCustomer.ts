import { useEffect, useState } from "preact/hooks";
import {
  customerStore,
  initCustomerStore,
  type IkasCustomer,
} from "@ikas/bp-storefront";

export function useAccountCustomer() {
  const [isReady, setIsReady] = useState(customerStore._initialized);

  const [customer, setCustomer] = useState<IkasCustomer | null>(
    customerStore.customer,
  );

  useEffect(() => {
    let mounted = true;

    // Store zaten yüklenmişse tekrar init etme.
    if (customerStore._initialized) {
      setCustomer(customerStore.customer);
      setIsReady(true);

      return () => {
        mounted = false;
      };
    }

    initCustomerStore(customerStore).finally(() => {
      if (!mounted) return;

      setCustomer(customerStore.customer);
      setIsReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    isReady,
    customer,
    setCustomer,
  };
}