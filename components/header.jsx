import { EthAddressSearchView } from "@/components/EthAddressSearchView";
import { RoutingButton } from "@/components/routing-button";
import { WalletMetadataView } from "@/components/WalletMetadataView";
import styles from "@/styles/Layout.module.css";
import { useWeb3React } from "@web3-react/core";
import { useCeramicContext } from "contexts/CeramicContext";
// TODO: layout, style
export default function Header() {
  const { client } = useCeramicContext();
  const { active } = useWeb3React();
  return (
    <div className={styles.header}>
      {active ? (
        <>
          <RoutingButton text="my page" pathname="/profile" />
          <RoutingButton text="feed" pathname="/feed" />
          <EthAddressSearchView />
        </>
      ) : null}
      <WalletMetadataView />
    </div>
  );
}
