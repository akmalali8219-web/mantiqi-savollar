export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questionsPool: Question[] = [
  {
    id: 1,
    question: "Qaysi oyda 28 kun bor?",
    options: [
      "Fevralda",
      "Dekabrda",
      "Mayda",
      "Barcha oylarda"
    ],
    correctIndex: 3,
    explanation: "Kalendar bo'yicha yilning barcha oylarida kamida 28 kun bor."
  },
  {
    id: 2,
    question: "Siz yugurish poygasida qatnashyapsiz va ikkinchi o'rindagi yuguruvchini quvib o'tdingiz. Hozir nechanchi o'rindasiz?",
    options: [
      "Birinchi",
      "Ikkinchi",
      "Uchinchi",
      "To'rtinchi"
    ],
    correctIndex: 1,
    explanation: "Ikkinchi o'rindagi odamni quvsangiz, uning o'rnini ya'ni ikkinchi o'rinni egallaysiz."
  },
  {
    id: 3,
    question: "Otaning 5 ta o'g'li bor. Har bir o'g'ilning bittadan singlisi bor. Otaning nechta farzandi bor?",
    options: [
      "10 ta",
      "6 ta",
      "5 ta",
      "9 ta"
    ],
    correctIndex: 1,
    explanation: "Hammasiga bitta umumiy singil to'g'ri keladi. Demak, 5 o'g'il va 1 qiz jami 6 ta farzand."
  },
  {
    id: 4,
    question: "Ikki kishi shaxmat o'ynayapti. Ular jami 5 ta o'yin o'ynashdi va har biri 5 marta g'olib bo'ldi. Bu qanday sodir bo'ldi?",
    options: [
      "Ular o'zaro durrang o'ynashgan",
      "Ular boshqa-boshqa odamlar bilan o'ynashgan",
      "Ular qoidalarni buzishgan",
      "Bu matematik xato"
    ],
    correctIndex: 1,
    explanation: "Ular bir-biri bilan emas, balki turli xil raqiblar bilan o'ynashgan."
  },
  {
    id: 5,
    question: "Xonaning burchagida turib, butun dunyoni aylanib chiqa oladigan narsa nima?",
    options: [
      "Telefon",
      "Xarita",
      "Pochta markasi",
      "Kompas"
    ],
    correctIndex: 2,
    explanation: "Pochta markasi xat burchagiga yopishtirilgan holda dunyo bo'ylab sayohat qiladi."
  },
  {
    id: 6,
    question: "Stol ustida 3 ta olma bor edi. Siz ulardan 2 tasini oldingiz. Sizda nechta olma bo'ldi?",
    options: [
      "1 ta",
      "2 ta",
      "3 ta",
      "0 ta"
    ],
    correctIndex: 1,
    explanation: "Siz stol ustidan o'zingiz olgan 2 ta olmaga ega bo'lasiz."
  },
  {
    id: 7,
    question: "Yomg'ir yoqqanda quyon qanday daraxt ostida bekinib o'tiradi?",
    options: [
      "Meva daraxti ostida",
      "Archa daraxti ostida",
      "Ho'l daraxt ostida",
      "Quruq daraxt ostida"
    ],
    correctIndex: 2,
    explanation: "Yomg'ir yoqqanda har qanday daraxt ho'llanadi, shuning uchun u ho'l daraxt tagida o'tirgan bo'ladi."
  },
  {
    id: 8,
    question: "Agar qizil toshni Qora dengizga tashlasangiz nima bo'ladi?",
    options: [
      "Qizarib ketadi",
      "Suv rangini o'zgartiradi",
      "Ho'llanadi va cho'kadi",
      "Erib ketadi"
    ],
    correctIndex: 2,
    explanation: "Tosh dengizga tushganda uning rangi o'zgarmaydi, shunchaki ho'l bo'ladi va pastga cho'kadi."
  },
  {
    id: 9,
    question: "Qaysi savolga hech qachon 'Ha' deb to'g'ri va mantiqan javob bera olmaysiz?",
    options: [
      "Hali uyg'unmisiz?",
      "Eshityapsizmi?",
      "Uxladingizmi uykuda?",
      "Hali ham uxlayapsizmi?"
    ],
    correctIndex: 3,
    explanation: "Uxlayotgan odam 'Hali ham uxlayapsizmi?' degan savolga rostakamiga 'Ha' deb javob berolmaydi."
  },
  {
    id: 10,
    question: "Osonlikcha ko'tarishingiz mumkin, lekin uzoq vaqt ushlab tura olmaysiz. Bu nima?",
    options: [
      "Suv",
      "Nafas",
      "Paxta sumkasi",
      "Ovoz"
    ],
    correctIndex: 1,
    explanation: "Nafas olasiz (ichingizga yutasiz), lekin uni uzoq vaqt ushlab tura olmaysiz."
  },
  {
    id: 11,
    question: "Nima uchun tovuq o'zini qushman deb aytolmaydi?",
    options: [
      "U ucha olmagani uchun",
      "U gapira olmagani uchun",
      "U tuxum qo'yishi sababli",
      "U hali juda kichik bo'lgani uchun"
    ],
    correctIndex: 1,
    explanation: "Tovuqlar qush toifasiga kirsa ham, gapirish qobiliyatiga ega emaslar."
  },
  {
    id: 12,
    question: "Agar 3 ta mushuk 3 ta sichqonni 3 minutda tutsa, 100 ta mushuk 100 ta sichqonni necha minutda tutadi?",
    options: [
      "100 minutda",
      "30 minutda",
      "3 minutda",
      "1 minutda"
    ],
    correctIndex: 2,
    explanation: "Chunki har bir mushuk alohida bitta sichqonni tutish uchun 3 minut sarflaydi."
  },
  {
    id: 13,
    question: "Qanchalik ko'p qazib olsangiz, shunchalik kattalashadigan narsa nima?",
    options: [
      "Chuqur (xandaq)",
      "Qarz",
      "Bilim",
      "Ulug'lik"
    ],
    correctIndex: 0,
    explanation: "Chuqurning tuprog'ini qancha ko'p olsangiz, u shunchalik kengayadi va kattalashadi."
  },
  {
    id: 14,
    question: "Dengiz tubida qanday toshlar umuman topilmaydi?",
    options: [
      "Qizil rangli",
      "Silliqlangan",
      "Quruq",
      "Dumaloq"
    ],
    correctIndex: 2,
    explanation: "Suv tagida quruq tosh bo'lishi mumkin emas."
  },
  {
    id: 15,
    question: "O'zi qimirlamaydi, lekin odamlarni har doim bir joydan ikkinchi joyga eltadi. Bu nima?",
    options: [
      "Poyezd",
      "Avtobus",
      "Yo'l",
      "Samolyot"
    ],
    correctIndex: 2,
    explanation: "Yo'l o'zi harakatlanmaydi, ammo undan o'tgan odamlarni kerakli joyga olib boradi."
  },
  {
    id: 16,
    question: "To'rtta oyog'i bor lekin yura olmaydi. Tishlari bor lekin tishlay olmaydi. Bu nima?",
    options: [
      "Taroq va stol",
      "Stol va taroq",
      "Krovat va it",
      "Vilka va arra"
    ],
    correctIndex: 1,
    explanation: "Stolning oyog'i ko'p lekin yurmaydi, taroqning tishlari bor lekin tishlamaydi."
  },
  {
    id: 17,
    question: "Qaysi idishdan umuman ovqat yeb bo'lmaydi?",
    options: [
      "Bo'sh idishdan",
      "Singan idishdan",
      "Plastmassa idishdan",
      "Chinni idishdan"
    ],
    correctIndex: 0,
    explanation: "Bo'sh idish ichida ovqat bo'lmaganligi uchun undan eb bo'lmaydi."
  },
  {
    id: 18,
    question: "Quloqlari bor eshitmaydi, og'zi bor gapirmaydi. Bu nima?",
    options: [
      "Qovun",
      "Qozon",
      "Igna",
      "Kitob"
    ],
    correctIndex: 1,
    explanation: "Qozonning chetidagi ushlagichlari quloq, yuqorisi og'iz deb ataladi, lekin u eshitmaydi va gapirmaydi."
  },
  {
    id: 19,
    question: "Uni hamma ko'radi, lekin hech kim ushlay olmaydi. U nima?",
    options: [
      "Havo",
      "Bulut",
      "Soya",
      "Shamol"
    ],
    correctIndex: 2,
    explanation: "Soya har doim shakl sifatida ko'rinadi, lekin moddiy bo'lmagani uchun uni ushlab bo'lmaydi."
  },
  {
    id: 20,
    question: "Suvda tug'iladi, suvda o'sadi, lekin yana suvga tushsa eriydi. Bu nima?",
    options: [
      "Tuz",
      "Muz",
      "Baliq",
      "Qor"
    ],
    correctIndex: 0,
    explanation: "Tuz sho'r suvni bug'latib olinadi, lekin suv bilan qayta to'qnashganda erib ketadi."
  },
  {
    id: 21,
    question: "Odam buni hayoti davomida dastlabki ikki marta bepul oladi, lekin hayotda uchinchi marta sotib olishi kerak bo'ladi. Bu nima?",
    options: [
      "Tishlar",
      "Bilim",
      "Pasport",
      "Uy"
    ],
    correctIndex: 0,
    explanation: "Insonning sut va doimiy tishlari tabiiy ravishda bepul chiqadi, keyingi sun'iysini esa sotib oladi."
  },
  {
    id: 22,
    question: "Qanoti yo'q — ucha oladi, ko'zi yo'q — yig'lay oladi. Bu nima?",
    options: [
      "Shamol",
      "Bulut",
      "Samolyot",
      "Yaxshilik"
    ],
    correctIndex: 1,
    explanation: "Bulut osmonda harakatlanadi (uchadi) va yomg'ir yog'diradi (yig'laydi)."
  },
  {
    id: 23,
    question: "Dunyo xaritasidagi eng quruq daryo qaysi?",
    options: [
      "Nil daryosi",
      "Amudaryo",
      "Xaritada chizilgan daryo",
      "Amazonka daryosi"
    ],
    correctIndex: 2,
    explanation: "Xaritadagi daryo faqat rasm bo'lib, unda mutlaq suv oqmaydi."
  },
  {
    id: 24,
    question: "U doim sakraydi, lekin uning yuragi urmaydi. Bu qanday ot?",
    options: [
      "Shaxmat taxtasidagi ot",
      "Sportchi ot",
      "O'yinchoq ot",
      "O'lik ot"
    ],
    correctIndex: 0,
    explanation: "Shaxmat donasi bo'lgan ot harakatlanadi (sakraydi), ammo jonsiz narsadir."
  },
  {
    id: 25,
    question: "1 kg temir og'irmi yoki 1 kg paxtami?",
    options: [
      "Temir og'ir",
      "Paxta og'ir",
      "Ikkasi ham teng",
      "Joyga qarab o'zgaradi"
    ],
    correctIndex: 2,
    explanation: "Chunki ikkalasining ham og'irligi bir xil, ya'ni roppa-rosa bir kilogrammdir."
  },
  {
    id: 26,
    question: "Kechki soat 20:00 da uyg'otkichni ertalabki 9:00 ga to'g'rilab uxladim. Men necha soat uxlayman?",
    options: [
      "13 soat",
      "1 soat",
      "9 soat",
      "11 soat"
    ],
    correctIndex: 1,
    explanation: "Mexanik mexanizmli uyg'otgich kechki 21:00 da (ya'ni 1 soatdan keyin) jiringlab yuboradi, chunki u kecha yoki kunduzni ajratmaydi."
  },
  {
    id: 27,
    question: "Xonada 10 ta sham yonib turibdi. Ulardan 3 tasini o'chirib qo'yishdi. Oxirida nechta sham qoladi?",
    options: [
      "10 ta",
      "7 ta",
      "3 ta",
      "Yolg'iz 1 ta"
    ],
    correctIndex: 2,
    explanation: "O'chirilgan 3 ta sham erib ketmay saqlanib qoladi, qolgan 7 tasi esa butunlay yonib bitadi."
  },
  {
    id: 28,
    question: "Gugurt donasi bilan qorong'u xonaga kirdingiz. Xonada kerosin lampasi, sham va o'tin pechi bor. Birinchi bo'lib nimani yoqasiz?",
    options: [
      "Gugurtni",
      "Kerosin lampasini",
      "Shamni",
      "Pechni"
    ],
    correctIndex: 0,
    explanation: "Narsalarni yoritish yoki isitishni boshlashdan avval gugurtning o'zini chaqish shart."
  },
  {
    id: 29,
    question: "Devor orasidan o'tishga imtiyoz beradigan, lekin devorga shikast yetkazmaydigan uy asbobi nima?",
    options: [
      "Eshik",
      "Deraza",
      "Kalit teshigi",
      "Chiroq nurini o'tkazish"
    ],
    correctIndex: 1,
    explanation: "Deraza orqali devorning orqasini devorni buzmasdan ko'rib, yorug'lik o'tkazish mumkin."
  },
  {
    id: 30,
    question: "Grenlandiya oroli hali kashf etilmasidan oldin ham, dunyodagi eng katta orol edimi?",
    options: [
      "Yo'q, chunki boshqa orol bor edi",
      "Ha, tabiiy ravishda u eng kattasi edi",
      "Faqat kashf etilgach kattalashgan",
      "Hech kim bilmaydi"
    ],
    correctIndex: 1,
    explanation: "Uning tabiati kashf qilingan yiliga bog'liq emas, eng katta jism bo'lib qolavergan."
  },
  {
    id: 31,
    question: "Men yangiligimda (yoshligimda) balandman, eskirsam (qarib bitgach) pastman. Men nimaniman?",
    options: [
      "Shamol",
      "Gugurt yoki sham",
      "Daraxt ko'chati",
      "Inson bo'yi"
    ],
    correctIndex: 1,
    explanation: "Sham yona-yona kichrayib, past bo'lib qoladi."
  },
  {
    id: 32,
    question: "Uni faqat sindirib (chaqib) yoki ochib keyin ishlatsa bo'ladi. U nima?",
    options: [
      "Tuxum",
      "Qulf",
      "Sandiq",
      "Shisha butilka"
    ],
    correctIndex: 0,
    explanation: "Tuxumni chaqmasdan oziq-ovqat maqsadida ishlatib bo'lmaydi."
  },
  {
    id: 33,
    question: "Kunduzi osmonda ucha oladi, ko'zlari bo'lmasa ham yomg'ir bo'lib yig'lay oladi. U nima?",
    options: [
      "Samolyot",
      "Kapalak",
      "Bulut",
      "Shamol nuri"
    ],
    correctIndex: 2,
    explanation: "Bulut osmonda uchib, yomg'ir suvi shaklida ko'z yosh to'kadi."
  },
  {
    id: 34,
    question: "Uni yasovchi o'zi kiyish uchun sotmaydi. Uni sotib olgan ham o'zi kiymaydi. Uni kiygan odam esa buni bilmaydi. Bu nima?",
    options: [
      "Tobut",
      "Niqob kiyimi",
      "To'y libosi",
      "Maxsus kiyim"
    ],
    correctIndex: 0,
    explanation: "Tobutni sotib olgan vafot etgan kishiga kiyindiradi, u odam jonsiz bo'lganidan buni sezmaydi."
  },
  {
    id: 35,
    question: "Bir odam dushda yoki yomg'irda qoldi. Unda soyabon ham, kiyim ham bo'lmagan bo'lsa-da, birorta sochi ho'l bo'lmadi. Nega?",
    options: [
      "U juda tez qochgan",
      "U odam butunlay kal (sochsiz) edi",
      "Suv muzlab qolgan edi",
      "U maxsus soyada turgan"
    ],
    correctIndex: 1,
    explanation: "Uni birorta ham sochi bo'lmaganligi uchun, ho'l bo'lishidan gap ketishi ham asossiz."
  },
  {
    id: 36,
    question: "U sizning otangizning farzandi, lekin akangiz ham, opangiz ham emas. U kim?",
    options: [
      "Sizning do'stingiz",
      "Sizning amakingiz",
      "Sizning o'zingiz",
      "Hech kim"
    ],
    correctIndex: 2,
    explanation: "Bu inson sizning o'zingizsiz (agar siz o'g'il yoki qiz bola bo'lsangiz)."
  },
  {
    id: 37,
    question: "Uning bo'yi bor, eni bor, lekin mutlaqo qalinligi yoki og'irligi yo'q. Bu nima?",
    options: [
      "Qog'oz varog'i",
      "Soya va uning aksi",
      "Chiziq",
      "Bo'shliq"
    ],
    correctIndex: 1,
    explanation: "Soya ikki o'lchamli tasvir bo'lib, uning qalinligi ham, og'irligi ham yo'q."
  },
  {
    id: 38,
    question: "Lug'atda qaysi so'z har doim 'noto'g'ri' deb yoziladi?",
    options: [
      "'Xato' so'zi",
      "'Noto'g'ri' so'zining o'zi",
      "'Imlo' qoidasi",
      "'Chigal' so'zi"
    ],
    correctIndex: 1,
    explanation: "'Noto'g'ri' so'zi har qanday lug'atda aynan 'noto'g'ri' harflari yordamida yoziladi."
  },
  {
    id: 39,
    question: "Rasmda yoki suv ostida hech narsani ko'ra olmaydigan ko'zoynak turi qaysi?",
    options: [
      "Quyosh ko'zoynagi",
      "Xira oynali ko'zoynak",
      "Yumilgan ko'z ustidagi har qanday ko'zoynak",
      "G'avvos ko'zoynagi"
    ],
    correctIndex: 2,
    explanation: "Ko'zni yumib olgan taqdiringizda hech qanday ko'zoynak ko'rishga yordam bermaydi."
  },
  {
    id: 40,
    question: "O'ziga boqqan kishining ko'rinishini aks ettiradi, lekin o'zi dars yoki ko'rish hisiga ega emas. U nima?",
    options: [
      "Ko'zgu (Oyna)",
      "Fotoapparat",
      "Kamera telefoni",
      "Monitor ekrani"
    ],
    correctIndex: 0,
    explanation: "Ko'zgu tasvirlarni aniq qaytaradi, lekin u jonli narsa emas."
  },
  {
    id: 41,
    question: "Kelishi aniq, xabar beriladi, lekin hech qachon bugun kela olmaydi. Bu nima?",
    options: [
      "Kecha",
      "Ertangi kun (Ertaga)",
      "Yaxshi fursat",
      "Tush ko'rish"
    ],
    correctIndex: 1,
    explanation: "Ertangi kun har doim ertaga bo'lib keladi, unga yetib borganimizda u 'Bugun'ga aylanadi."
  },
  {
    id: 42,
    question: "'O'zbek alifbosi' so'zlarining o'zida jami nechta harf mavjud?",
    options: [
      "14 ta harf",
      "29 ta harf",
      "12 ta harf",
      "10 ta harf"
    ],
    correctIndex: 0,
    explanation: "'O'-z-b-e-k a-l-i-f-b-o-s-i' iborasining harflarini sanasangiz jami 14 ta harf chiqadi."
  },
  {
    id: 43,
    question: "Mantiqiy-matematik nuqtai nazardan eng kichik ikki xonali son qaysi?",
    options: [
      "10",
      "-99",
      "01",
      "-10"
    ],
    correctIndex: 1,
    explanation: "Manfiy sonlarni hisobga olsak, -99 eng kichik qiymatga ega ikki xonali sondir."
  },
  {
    id: 44,
    question: "Chinor ustida 5 ta chumchuq o'tirgan edi. Ovchi bittasini miltiq bilan urdi. Chinorda nechta chumchuq qoldi?",
    options: [
      "4 ta",
      "1 ta",
      "0 ta",
      "3 ta"
    ],
    correctIndex: 2,
    explanation: "Birining o'limidan va o'q ovozidan so'ng qolgan barcha chumchuqlar uchib ketadi."
  },
  {
    id: 45,
    question: "Nima uchun yovvoyi ayiqlar qishda inlarida uxlaydilar?",
    options: [
      "Chunki qishda ozuqa topish qiyin va sovuq",
      "Chunki ularning uylari yo'q",
      "Ularga qish yoqmaydi",
      "Kassa bo'lmagani uchun"
    ],
    correctIndex: 0,
    explanation: "Energiya tejash va ozuqa tanqisligidan omon qolish uchun ular qishki uyquga ketadilar."
  },
  {
    id: 46,
    question: "Yoz kelganda barq urib kiyinadi, qish kelganda butunlay yechinadi. Bu nima?",
    options: [
      "Ilon",
      "Kiyik",
      "Daraxt",
      "Kiyim javoni"
    ],
    correctIndex: 2,
    explanation: "Daraxtlar yoz va bahorda barg kiyadi, qishda esa barglarini to'kadi."
  },
  {
    id: 47,
    question: "Agar 5 ta odam 5 kunda 5 ta bino qura olsa, 100 ta odam 100 ta shunday binoni necha kunda qura oladi?",
    options: [
      "100 kunda",
      "50 kunda",
      "5 kunda",
      "1 kunda"
    ],
    correctIndex: 2,
    explanation: "Ish kuchi va binolar parallel ravishda mutanosib oshsa, jami vaqt o'zgarmay 5 kunligicha qoladi."
  },
  {
    id: 48,
    question: "Yuk mashinasi chiroqlarisiz tungi yo'lda kelayotgan edi. Yo'lni bir ayol kesib o'tdi. Haydovchi uni darhol ko'rib to'xtadi. Buni qanday tushuntirish mumkin?",
    options: [
      "Ko'chadagi hamma chiroqlar yoniq edi",
      "Voqea kunduz kuni bo'lgan",
      "Ayolda yorug'lik qaytaruvchi bor edi",
      "Haydovchi o'ta chaqqon edi"
    ],
    correctIndex: 1,
    explanation: "Chunki voqea kunduzi yorug' vaqtda sodir bo'lgan, shuning uchun yuk mashinasining chirog'i kerak bo'lmagan."
  },
  {
    id: 49,
    question: "Toshkentdan vodiy tomonga eng katta tezlikda ketayotgan poyezdning (elektrovozning) tutuni qayerga qaraydi?",
    options: [
      "G'arbga qaraydi",
      "Orqaga qarab cho'ziladi",
      "O'ng tomonga",
      "Elektrovozda tutun bo'lmaydi"
    ],
    correctIndex: 3,
    explanation: "Zamonaviy poyezdlar po'lat yo'ldan elektr energiyasi oladi, ulardan hech qanday tutun chiqmaydi."
  },
  {
    id: 50,
    question: "Nima o'zi qanchalik quruq bo'lsa, suvni shunchalik ko'p yutadi va tez ho'llanadi?",
    options: [
      "Quvurchilik o'rni",
      "Quruq sochiq (gubka)",
      "Bulut parchalari",
      "Quruq qum barxani"
    ],
    correctIndex: 1,
    explanation: "Quruq gubka yoki sochiq suvni tozalaydi, ya'ni yutadi va o'zi ho'llanadi."
  }
];
