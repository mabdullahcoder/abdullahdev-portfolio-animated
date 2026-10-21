import LocalMindVisual from "./LocalMindVisual";
import LumenVisual from "./LumenVisual";
import MorphVisual from "./MorphVisual";
import PolychatVisual from "./PolychatVisual";
import SignChainVisual from "./SignChainVisual";
import TaskpilotVisual from "./TaskpilotVisual";
import UnifyApiVisual from "./UnifyApiVisual";
import VaultMailVisual from "./VaultMailVisual";

/** Maps `product.visual` ids to their mockup component. */
export const PRODUCT_VISUALS = {
  lumen: LumenVisual,
  "vault-mail": VaultMailVisual,
  "unify-api": UnifyApiVisual,
  taskpilot: TaskpilotVisual,
  polychat: PolychatVisual,
  morph: MorphVisual,
  signchain: SignChainVisual,
  localmind: LocalMindVisual,
};
