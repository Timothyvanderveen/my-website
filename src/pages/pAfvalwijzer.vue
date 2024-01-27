<template>
  <div class="afvalwijzer">
    <div v-if="permission !== 'granted'" class="afvalwijzer-button__wrapper">
      <p @click="grantNotifications" v-text="`Allow notifications`" />
    </div>
    <div v-else class="afvalwijzer-afvalstroom__wrapper">
      <p
        v-for="afvalstroom in afvalstromen"
        :key="afvalstroom.id"
        v-text="
          `${afvalstroom.title}: ${new Date(
            afvalstroom.ophaaldatum
          ).toLocaleDateString()} (${getDiffInDaysLabel(
            afvalstroom.ophaaldatum
          )})`
        "
      />
    </div>
    <div class="afvalwijzer__options">
      <div class="zipcode afvalwijzer__option">
        <label for="zipcode">Postcode</label>
        <input id="zipcode" v-model="options.address.zipcode" type="text" />
      </div>
      <div class="house_number afvalwijzer__option">
        <label for="house_number">House number</label>
        <input
          id="house_number"
          v-model="options.address.houseNumber"
          type="text"
        />
      </div>
      <button @click="updateAfvalstromen">Update</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from "vue";
import Cookies from "js-cookie";

interface GetAddressResponse {
  0: {
    bagid: string;
    postcode: string;
    huisnummer: number;
    huisletter: string;
    toevoeging: string;
    description: string;
    straat: string;
    woonplaats: string;
    woonplaatsId: number;
    gemeenteId: number;
    latitude: number;
    longitude: number;
  };
}

interface GetAfvalstromenResponse {
  id: number;
  parent_id: number;
  title: string;
  tags: string;
  page_title: string;
  content: string;
  menu_title: string;
  icon: string;
  icon_data: string;
  ophaaldatum: string;
}

const permission: Ref<string> = ref(Notification.permission);
const addressId: Ref<string | null> = ref(null);
const afvalstromen: Ref<Array<GetAfvalstromenResponse>> = ref([]);
const options = reactive({
  address: {
    zipcode: null,
    houseNumber: null,
  },
});

async function grantNotifications() {
  await Notification.requestPermission();
  permission.value = Notification.permission;
}

onMounted(async () => {
  addressId.value = Cookies.get("addressId") ?? null;
  await updateAfvalstromen();
  await setNotifications();
});

async function updateAfvalstromen() {
  if (!addressId.value) {
    const addressResponse = await getAddress();
    const addressJson: GetAddressResponse = await addressResponse.json();
    addressId.value = addressJson?.[0]?.bagid ?? null;
  }
  if (addressId.value) {
    Cookies.set("addressId", addressId.value);
    const afvalstromenResponse = await getAfvalstromen();
    afvalstromenResponse
      .json()
      .then((response: Array<GetAfvalstromenResponse>) => {
        afvalstromen.value = response.filter((f) => f.ophaaldatum);
      });
  }
}

async function getAddress() {
  return fetch(
    `https://afvalkalender.sudwestfryslan.nl/adressen/${options.address.zipcode}:${options.address.houseNumber}`,
    {
      method: "GET",
    }
  );
}

async function getAfvalstromen() {
  return fetch(
    `https://afvalkalender.sudwestfryslan.nl/rest/adressen/${addressId.value}/afvalstromen`,
    {
      method: "GET",
    }
  );
}

async function setNotifications() {
  const serviceWorker = await navigator.serviceWorker.ready;
  const options = {
    userVisibleOnly: true,
    applicationServerKey: "offalkalinder",
  };
  // serviceWorker.pushManager.subscribe(options).then(function (subscription) {
  //   // sendSubscriptionToServer function is implemented in Code Snippet 13
  //   // return sendSubscriptionToServer(subscription);
  // });
}

function getDiffInDaysLabel(date: string) {
  let ophaaldatum = new Date(date);
  let now = new Date();

  let Difference_In_Time = now.getTime() - ophaaldatum.getTime();
  const diffInDays = Math.abs(
    Math.round(Difference_In_Time / (1000 * 3600 * 24))
  );
  let dayLabel = "morgen";

  switch (diffInDays) {
    case 0:
      dayLabel = "Vandaag";
      break;
    case 1:
      dayLabel = "Morgen";
      break;
  }

  return (
    Array.from(Array(diffInDays > 3 ? diffInDays - 2 : 0))
      .map((day, index) => (index === 0 ? "Over" : "over"))
      .join("") + dayLabel
  );
}
</script>

<style lang="scss" scoped>
.afvalwijzer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-family: Manrope, serif;
    font-weight: 900;
  }
}

.afvalwijzer__options {
  position: absolute;
  bottom: 3em;
  left: 3em;
  display: flex;
  gap: 0.5em;
  flex-direction: column;

  .afvalwijzer__option {
    display: flex;
    justify-content: space-between;
    gap: 1em;
  }
}
</style>
