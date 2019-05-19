import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import {
  faXbox,
  faPlaystation,
  faNintendoSwitch
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faDesktop, faNintendoSwitch, faXbox, faPlaystation);

Vue.component("font-awesome-icon", FontAwesomeIcon);
