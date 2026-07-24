export const siteConfig = {
  name: "Pousada Lua Rosa",
  address: "Estrada Geral do Rosa, S/N",
  city: "Praia do Rosa",
  municipality: "Imbituba",
  state: "Santa Catarina",
  postalCode: "88780-000",
  country: "Brasil",
  phone: null,
  whatsapp: null,
  whatsappMessage:
    "Olá! Gostaria de saber mais sobre hospedagem na Pousada Lua Rosa.",
  instagram: "https://www.instagram.com/sentieropraiadorosa/",
  booking: "https://www.booking.com/hotel/br/pousada-lua-rosa.pt-br.html",
  tripadvisor:
    "https://www.tripadvisor.com.br/Hotel_Review-g667789-d5599920-Reviews-Pousada_Sentiero_Praia_do_Rosa-Praia_do_Rosa_Imbituba_State_of_Santa_Catarina.html",
  location:
    "https://www.google.com/maps/search/?api=1&query=Estrada+Geral+do+Rosa%2C+S%2FN%2C+Praia+do+Rosa%2C+Imbituba%2C+SC%2C+88780-000",
} as const;

export const whatsappUrl = siteConfig.whatsapp
  ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
  : null;
