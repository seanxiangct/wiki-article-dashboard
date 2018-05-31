const Revision = require("../models/revision");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
var bot = require('nodemw');

// pass configuration object
var client = new bot({
  protocol: 'https',           // Wikipedia now enforces HTTPS
  server: 'en.wikipedia.org',  // host name of MediaWiki-powered site
  path: '/w',                  // path to api.php script
  debug: false                 // is more verbose when set to true
});
   
//
var admin = ["5 albert square",
"78.26",
"Acalamari",
"Acdixon",
"Acroterion",
"Ad Orientem",
"Adam Bishop",
"Agathoclea",
"Al Ameer son",
"Ale jrb",
"Alexf",
"AlexiusHoratius",
"Alison",
"AlistairMcMillan",
"Amakuru",
"Amire80",
"Amortias",
"Anachronist",
"Ancheta Wis",
"Andrew Gray",
"Andrew Yong",
"Andrewa",
"AnemoneProjectors",
"Angelo.romano",
"Angr",
"Anna Frodesiak",
"Anne Delong",
"Anomie",
"AnomieBOT III",
"Antandrus",
"Anthere",
"Anthony Appleyard",
"Anthony Bradbury",
"Arctic.gnome",
"ArnoldReinhold",
"Art LaPella",
"Arthur Rubin",
"Athaenara",
"Ausir",
"AustralianRupert",
"AxelBoldt",
"B",
"Bagumba",
"Barek",
"Basalisk",
"Bbb23",
"BD2412",
"BDD",
"Bduke",
"Bearcat",
"Beeblebrox",
"Beetstra",
"Beland",
"Bencherlite",
"BethNaught",
"Bgwhite",
"Biblioworm",
"BigDom",
"BigHaz",
"Bilby",
"Billinghurst",
"Bishonen",
"Bkonrad",
"Black Kite",
"Bobak",
"Boing! said Zebedee",
"Bongwarrior",
"Boson",
"BOZ",
"Brianga",
"Brookie",
"BrownHairedGirl",
"BU Rob13",
"Buckshot06",
"Bumm13",
"CactusWriter",
"Caknuck",
"Callanecc",
"Calliopejen1",
"CambridgeBayWeather",
"Canadian Paul",
"Canley",
"Canterbury Tail",
"Capitalistroadster",
"Carcharoth",
"Carioca",
"Carlossuarez46",
"Casliber",
"Catfish Jim and the soapdish",
"Cbl62",
"Cenarium",
"Cerebellum",
"Ceyockey",
"C.Fred",
"Charles Matthews",
"Choess",
"ChrisTheDude",
"CJCurrie",
"Closedmouth",
"CLW",
"Coffee",
"Connormah",
"CorbieVreccan",
"Courcelles",
"CRGreathouse",
"Crisco 1492",
"Cryptic",
"Cuchullain",
"Cyberpower678",
"Cyclonebiskit",
"Cydebot",
"Cyp",
"Cyphoidbomb",
"Czar",
"DaGizza",
"Dale Arnett",
"Daniel Case",
"Dank",
"Darwinek",
"Dave souza",
"David Eppstein",
"David Fuchs",
"David Gerard",
"David Levy",
"DavidWBrooks",
"Dbachmann",
"Ddstretch",
"De728631",
"Deb",
"Deckiller",
"Delirium",
"DeltaQuad",
"Deor",
"Deryck Chan",
"DGG",
"Diannaa",
"Dino",
"Discospinster",
"Djsasso",
"DMacks",
"Doc James",
"Doczilla",
"Dodger67",
"DoRD",
"Doug Weller",
"DragonflySixtyseven",
"Dragons flight",
"DrKay",
"Drmies",
"Dumelow",
"Dweller",
"DYKUpdateBot",
"Eagles247",
"Ealdgyth",
"Earl Andrew",
"Edcolins",
"Edgar181",
"Edison",
"EdJohnston",
"Edward",
"Ekabhishek",
"El C",
"Eleassar",
"Electionworld",
"Eluchil404",
"EncMstr",
"Enigmaman",
"ERcheck",
"ErikHaugen",
"ESkog",
"Espresso Addict",
"EurekaLott",
"Euryalus",
"Everyking",
"Excirial",
"Explicit",
"Ezhiki",
"Fabrictramp",
"Fastily",
"Favonian",
"Fayenatic london",
"Fences and windows",
"Fenix down",
"Ferret",
"Finlay McWalter",
"FloNight",
"Floquenbeam",
"Foxj",
"Fram",
"Frank",
"Fred Bauder",
"FT2",
"Fuhghettaboutit",
"Furrykef",
"Future Perfect at Sunrise",
"Fuzheado",
"Gabbe",
"Gadfium",
"Gamaliel",
"Gatoclass",
"GB fan",
"Geni",
"Georgewilliamherbert",
"Geschichte",
"GiantSnowman",
"Gilliam",
"Gnangarra",
"Go Phightins!",
"Gogo Dodo",
"Golbez",
"GoldRingChip",
"GorillaWarfare",
"Graeme Bartlett",
"Graham Beards",
"Graham87",
"Grant65",
"Grendelkhan",
"Grondemar",
"Ground Zero",
"Grutness",
"Gryffindor",
"Guettarda",
"Gyrofrog",
"Harej",
"Harrias",
"Harryboyles",
"Heimstern",
"Hesperian",
"HJ Mitchell",
"Hoary",
"Howcheng",
"Huntster",
"Huon",
"Hurricanehink",
"Hut 8.5",
"Hyacinth",
"I JethroBT",
"Ianblair23",
"Ian.thomson",
"IceKarma",
"Iridescent",
"IronGargoyle",
"Ish ishwar",
"It Is Me Here",
"Ivanvector",
"Ixfd64",
"J Milburn",
"Jac16888",
"JamesBWatson",
"Jason Quinn",
"Jauerback",
"Jayjg",
"Jayron32",
"Jdforrester",
"Jehochman",
"Jenks24",
"Jerzy",
"Jesse Viviano",
"Jfdwolff",
"JHunterJ",
"Jimbo Wales",
"Jimfbleak",
"Jimp",
"Jmabel",
"Jni",
"Joe Decker",
"John",
"John K",
"JoJan",
"Jo-Jo Eumerus",
"Jonathunder",
"Joy",
"JPG-GR",
"Jpgordon",
"Juliancolton",
"Just Chilling",
"Jwrosenzweig",
"JzG",
"K6ka",
"Kaihsu",
"Kaiser matias",
"Kbh3rd",
"Keegan",
"Keenan Pepper",
"Keilana",
"Keith D",
"Kelapstick",
"Kim Dent-Brown",
"King of Hearts",
"Kinu",
"Kirill Lokshin",
"Kizor",
"KrakatoaKatie",
"Ks0stm",
"KTC",
"Kudpung",
"Kuru",
"Kurykh",
"Kusma",
"LadyofShalott",
"Lankiveil",
"Laser brain",
"Lectonar",
"Legoktm",
"Lenticel",
"Leyo",
"Llywrch",
"Lowellian",
"Mackensen",
"Magioladitis",
"Magnus Manske",
"Magog the Ogre",
"Maile66",
"Mandsford",
"Marine 69-71",
"Masem",
"Materialscientist",
"Mattflaschen",
"Mattinbgn",
"Mattythewhite",
"Maury Markowitz",
"Maxim",
"MaxSem",
"MBisanz",
"MelanieN",
"Menchi",
"Meno25",
"MER-C",
"Metropolitan90",
"Mets501",
"Mfield",
"Michael Hardy",
"MichaelQSchmidt",
"Michig",
"MIDI",
"Mifter",
"Mike Cline",
"Mike Peel",
"Mike Rosoft",
"Mike Selinker",
"Mikeblas",
"MilborneOne",
"Mindmatrix",
"Minesweeper",
"Miniapolis",
"MisfitToys",
"Missvain",
"Mitchazenia",
"Mjroots",
"Mkdw",
"Mlaffs",
"MLauba",
"Moabdave",
"Mojo Hand",
"Moncrief",
"Monty845",
"Moriori",
"Mr. Stradivarius",
"MSGJ",
"MusikAnimal",
"MusikBot II",
"Mz7",
"Nabla",
"Necrothesp",
"NeilN",
"Neutrality",
"Nev1",
"Newyorkbrad",
"Nick",
"Nick-D",
"Nightstallion",
"Nihiltres",
"Nihonjoe",
"NinjaRobotPirate",
"Nlu",
"Northamerica1000",
"Nthep",
"NuclearWarfare",
"Number 57",
"Nunh-huh",
"Nyttend",
"Od Mishehu",
"OhanaUnited",
"Ohnoitsjamie",
"Oleg Alexandrov",
"OlEnglish",
"Opabinia regalis",
"Optimist on the run",
"Orangemike",
"Oshwah",
"Owen",
"Parsecboy",
"Patar knight",
"Paul August",
"Paul Erik",
"Paulmcdonald",
"PBS",
"Peacemaker67",
"PedanticallySpeaking",
"Pegship",
"Peridon",
"Peteforsyth",
"PFHLai",
"Pharos",
"Phil Boswell",
"Philg88",
"PhilKnight",
"Pinkville",
"Plastikspork",
"Ponyo",
"Postdlf",
"Pratyeka",
"Premeditated Chaos",
"PresN",
"Primefac",
"PrimeHunter",
"ProhibitOnions",
"Prolog",
"ProveIt",
"Ragesoss",
"Rama",
"Rami R",
"Randykitty",
"Redrose64",
"RedWolf",
"RegentsPark",
"Rehman",
"Renata3",
"Resolute",
"RHaworth",
"Richwales",
"RickinBaltimore",
"Risker",
"Ritchie333",
"RJFJR",
"Rklawton",
"RL0919",
"Rlandmann",
"Rlendog",
"Rmhermen",
"R'n'B",
"RockMagnetist",
"Roger Davies",
"Rogerd",
"Ronhjones",
"Rosiestep",
"Rossami",
"Royalbroil",
"RoySmith",
"Rschen7754",
"Ruslik0",
"Sabine's Sunbird",
"Sadads",
"Salix alba",
"Salvidrim!",
"Salvio giuliano",
"Samsara",
"Samwalton9",
"Sandstein",
"Sarahj2107",
"Schissel",
"Schneelocke",
"Schwede66",
"Scott",
"ScottDavis",
"Ser Amantio di Nicolao",
"Seraphimblade",
"Sergecross73",
"Shirt58",
"Shubinator",
"Shyamal",
"SilkTork",
"Sj",
"Sky Harbor",
"Slakr",
"Slambo",
"SlimVirgin",
"Smalljim",
"Smartse",
"Smith609",
"Smurrayinchester",
"Someguy1221",
"SouthernNights",
"SoWhy",
"SpacemanSpiff",
"Spartaz",
"Spellcast",
"Spencer",
"Sphilbrick",
"Spinningspark",
"SQL",
"Starblind",
"Stephan Schulz",
"Stephen",
"Stifle",
"SuperMarioMan",
"Swarm",
"Tabercil",
"Tassedethe",
"Tavix",
"Tedder",
"TenOfAllTrades",
"TFA Protector Bot",
"The Anome",
"The Blade of the Northern Lights",
"The Bushranger",
"The ed17",
"The Land",
"The Tom",
"The Wordsmith",
"The wub",
"TheCatalyst31",
"TheDJ",
"There'sNoTime",
"Thryduulf",
"Thue",
"Thumperward",
"Tide rolls",
"Tim!",
"Timotheus Canens",
"Timrollpickering",
"Titodutta",
"TLSuda",
"Tokyogirl79",
"Tom Morris",
"TommyBoy",
"TomStar81",
"Tone",
"Tony Fox",
"Topbanana",
"TParis",
"Trappist the monk",
"Tyrol5",
"Ultraexactzz",
"Urhixidur",
"Utcursch",
"Valfontis",
"Vanamonde93",
"Vanjagenije",
"VegaDark",
"Vejvančický",
"Versageek",
"Victuallers",
"Vsmith",
"Waggers",
"Waldir",
"Warofdreams",
"Wbm1058",
"Wehwalt",
"WereSpielChequers",
"West.andrew.g",
"WhisperToMe",
"Widr",
"Wikiacc",
"Wizardman",
"WJBscribe",
"Woody",
"Woohookitty",
"WOSlinker",
"Wouterstomp",
"Wtmitchell",
"Xaosflux",
"Xeno",
"Xezbeth",
"Xymmax",
"Y",
"Yamaguchi先生",
"Yamla",
"Yaris678",
"Ymblanter",
"Ynhockey",
"Yunshui",
"Zanimum",
"Zero0000",
"Zzuuzz",
"Zzyzx11"];
var bot = ["User",
"Cydebot",
"WP 1.0 bot",
"SmackBot",
"Yobot",
"ClueBot NG",
"Addbot",
"SineBot",
"EmausBot",
"ClueBot",
"RjwilmsiBot",
"AnomieBOT",
"Xqbot",
"RussBot",
"Fbot",
"Luckas-bot",
"BetacommandBot",
"The Anomebot2",
"COIBot",
"Lightbot",
"AlexNewArtBot",
"ZéroBot",
"Helpful Pixie Bot",
"OrphanBot",
"BattyBot",
"FrescoBot",
"MiszaBot III",
"Legobot",
"SporkBot",
"TXiKiBoT",
"XLinkBot",
"VeblenBot",
"AvicBot",
"AAlertBot",
"ListasBot",
"Thijs!bot",
"VolkovBot",
"Kingbotk",
"Erik9bot",
"Alaibot",
"SieBot",
"TedderBot",
"CommonsDelinker",
"BOTijo",
"Xenobot Mk V",
"D6",
"ClueBot III",
"BG19bot",
"EdwardsBot",
"Bluebot",
"Mathbot",
"CmdrObot",
"DASHBot",
"Full-date unlinking bot",
"BotMultichill",
"Citation bot",
"YurikBot",
"VoABot II",
"ImageRemovalBot",
"BJBot",
"MiszaBot II",
"Eubot",
"ArthurBot",
"AntiVandalBot",
"HasteurBot",
"HBC AIV helperbot7",
"VIAFbot",
"MiszaBot I",
"Escarbot",
"SoxBot",
"Cyberbot I",
"MetsBot",
"DeltaQuadBot",
"DPL bot",
"FlaBot",
"RFC bot",
"DumZiBoT",
"Polbot",
"STBotI",
"Xenobot",
"Alexbot",
"KrimpBot",
"MartinBot",
"Kbdankbot",
"ImageTaggingBot",
"Femto Bot",
"MGA73bot",
"MystBot",
"YFdyh-bot",
"CorenSearchBot",
"Chobot",
"HBC Archive Indexerbot",
"ProteinBoxBot",
"Kumi-Taskbot",
"Kotbot",
"JAnDbot",
"Monkbot",
"DrilBot",
"GrouchoBot",
"DumbBOT",
"Zorrobot",
"WikitanvirBot",
"FairuseBot",
"WildBot",
"HBC AIV helperbot3",
"Rambot",
"RedBot",
"タチコマ robot",
"NoomBot",
"MartinBotIII",
"DodoBot",
"TinucherianBot",
"H3llBot",
"CheMoBot",
"Tawkerbot2",
"Citation bot 1",
"ShepBot",
"Reedy Bot",
"GA bot",
"InceptionBot",
"Detroiterbot",
"LaaknorBot",
"SkiersBot",
"Chris G Bot 3",
"LaraBot",
"Lowercase sigmabot III",
"SatyrBot",
"Ganeshbot",
"HBC AIV helperbot5",
"DYKUpdateBot",
"Svenbot",
"BryanBot",
"BracketBot",
"Tawkerbot",
"Pearle",
"Hmainsbot1",
"PseudoBot",
"JL-Bot",
"DarknessBot",
"ChuispastonBot",
"OKBot",
"Makecat-bot",
"LucienBOT",
"Alphachimpbot",
"718 Bot",
"Snotbot",
"Scsbot",
"KLBot2",
"HagermanBot",
"Numbo3-bot",
"28bot",
"AlleborgoBot",
"Robbot",
"EarwigBot",
"HostBot",
"Rei-bot",
"Hazard-Bot",
"DFBot",
"RM bot",
"RobotG",
"Wikinews Importer Bot",
"The wubbot",
"BotMultichillT",
"MiszaBot",
"CactusBot",
"DSisyphBot",
"AvocatoBot",
"ArticlesForCreationBot",
"BrownBot",
"GimmeBot",
"CanisRufus",
"Mr.Z-bot",
"RibotBOT",
"Redirect fixer",
"MadmanBot",
"STBot",
"Ptbotgourou",
"PhotoCatBot",
"Theo's Little Bot",
"DYKHousekeepingBot",
"ArticleAlertbot",
"Amalthea (bot)",
"MastiBot",
"Erwin85Bot",
"SQLBot",
"RMCD bot",
"Werdnabot",
"Thehelpfulbot",
"Ralbot",
"SoxBot V",
"Amirobot",
"DragonBot",
"STTWbot",
"MelonBot",
"CommonsNotificationBot",
"FoxBot",
"BAGBot",
"Sambot",
"ClueBot II",
"Idioma-bot",
"TuHan-Bot",
"MalafayaBot",
"MediaWiki message delivery",
"Staeckerbot",
"HRoestBot",
"KamikazeBot",
"JackieBot",
"SuggestBot",
"Maelgwnbot",
"VoxelBot",
"Uncle G's major work 'bot",
"Shadowbot3",
"Drinibot",
"PotatoBot",
"Rezabot",
"MarshBot",
"BogBot",
"Cyberbot II",
"DefaultsortBot",
"SharedIPArchiveBot",
"Tangobot",
"PixelBot",
"Thadius856AWB",
"TPBot",
"DyceBot",
"WatchlistBot",
"Gdrbot",
"SDPatrolBot",
"DOI bot",
"ArmbrustBot",
"SashatoBot",
"TobeBot",
"AntiSpamBot",
"SassoBot",
"JYBot",
"Rubinbot",
"People-photo-bot",
"LivingBot",
"SilvonenBot",
"MenasimBot",
"Sandbot",
"Muro Bot",
"DinoBot2",
"AP.BOT",
"BotanyBot",
"Sethbot",
"Jogersbot",
"Obersachsebot",
"Petan-Bot",
"BernsteinBot",
"SteveBot",
"ChzzBot IV",
"WinBot",
"STBotD",
"ContinuityBot",
"HBC AIV helperbot2",
"Eskimbot",
"Ohms Law Bot",
"Δbot",
"D'ohBot",
"DHN-bot",
"J Milburn Bot",
"Ripchip Bot",
"FeedBot",
"PipepBot",
"KingpinBot",
"AdminStatsBot",
"Scepbot",
"OgreBot",
"BOTarate",
"One bot",
"Guanabot",
"CapitalBot",
"KevinBot",
"SPCUClerkbot",
"MifterBot I",
"HBC NameWatcherBot",
"CSDWarnBot",
"AMbot",
"SoxBot III",
"VoABot",
"Curpsbot-unicodify",
"JeffGBot",
"TjBot",
"Commander Keane bot",
"TaBOT-zerem",
"HBC AIV helperbot",
"MerlIwBot",
"Android Mouse Bot 2",
"LyricsBot",
"Mjbmrbot",
"Whobot",
"PbBot",
"Gnome (Bot)",
"BoxCrawler",
"KarlsenBot",
"JBradley Bot",
"COBot",
"Lowercase sigmabot",
"Chartbot",
"Broadbot",
"Phe-bot",
"A4bot",
"Comics-awb",
"DYKadminBot",
"JoeBot",
"Dinamik-bot",
".anacondabot",
"JhsBot",
"DASHBotAV",
"Snowbot",
"ChzzBot II",
"RonaldBot",
"AfDBot",
"RBot",
"MPUploadBot",
"^demonBot2",
"John Bot",
"AWeenieBot",
"HBC AIV helperbot4",
"Pegasusbot",
"Synthebot",
"OverlordQBot",
"AndersBot",
"WikiStatsBOT",
"Rick Bot",
"BOT-Superzerocool",
"Vagobot",
"CarsracBot",
"Tawkerbot4",
"MessedRobot",
"SpBot",
"EmxBot",
"AlnoktaBOT",
"WelcomerBot",
"Filedelinkerbot",
"Legobot II",
"BenzolBot",
"SoxBot II",
"BorgardeBot",
"SoxBot IV",
"Vina-iwbot",
"Seedbot",
"RoboMaxCyberSem",
"Zwobot",
"JaGaBot",
"Lowercase sigmabot II",
"Arbitrarily0Bot",
"Rschen7754bot",
"Grafikbot",
"Taxobot 1",
"Bibcode Bot",
"VWBot",
"MerlLinkBot",
"SQLBot-Hello",
"CobraBot",
"Locobot",
"LordAnubisBOT",
"MBisanzBot",
"MenoBot",
"Kyle the bot",
"LostBot",
"PeerReviewBot",
"EdoBot",
"SelketBot",
"Bot1058",
"Justincheng12345-bot",
"UnCatBot",
"Sagabot",
"MifterBot",
"XLerateBot",
"XyBot",
"Roboto de Ajvol",
"Alph Bot",
"NW557Bot",
"NjardarBot",
"Giggabot",
"RobotE",
"KnightRider",
"DorganBot",
"KocjoBot",
"WPArkansas Bot",
"GrinBot",
"Fluxbot",
"MondalorBot",
"CounterVandalismBot",
"Citation bot 2",
"MauritsBot",
"WeggeBot",
"FlBot",
"Jumbuck",
"NetBot",
"Zorglbot",
"MSBOT",
"KevinalewisBot",
"Lucasbfrbot",
"RebelRobot",
"Taxobot 7",
"JdforresterBot",
"RaptureBot",
"DixonDBot",
"Chem-awb",
"ZhBot",
"CitationCleanerBot",
"Tsca.bot",
"Anybot",
"NationalRegisterBot",
"Bot0612",
"Almabot",
"Tom's Tagging Bot",
"LinkFA-Bot",
"ArkyBot",
"TechBot",
"AccReqBot",
"Mairibot",
"CopyToWiktionaryBot",
"BotKung",
"RoryBot",
"SD5bot",
"Bota47",
"HiW-Bot",
"MoohanBOT",
"CocuBot",
"Ligulembot",
"HersfoldArbClerkBot",
"Acebot",
"RockfangBot",
"Gerakibot",
"Chlewbot",
"AkhtaBot",
"Crypticbot",
"SteenthIWbot",
"Luasóg bot",
"Jitse's bot",
"SamatBot",
"Kasirbot",
"MenoBot II",
"MessageDeliveryBot",
"Syrcatbot",
"RileyBot",
"HerculeBot",
"Cerabot",
"CrimsonBot",
"HBC AIV helperbot11",
"YpnBot",
"StigBot",
"KslotteBot",
"Mentibot",
"John Bot III",
"DarafshBot",
"Anchor Link Bot",
"BHGbot",
"McM.bot",
"ReferenceBot",
"StatisticianBot",
"Chris G Bot",
"Louperibot",
"El bot de la dieta",
"HtonlBot",
"JCbot",
"Peelbot",
"VVVBot",
"Pageview bot",
"WebCiteBOT",
"Wherebot",
"GargoyleBot",
"IluvatarBot",
"BrokenAnchorBot",
"HotArticlesBot",
"KittyBot",
"ENewsBot",
"EarwigBot I",
"VixDaemonBot",
"Pokbot",
"FlagBot",
"SpellingBot",
"PDFbot",
"LatitudeBot",
"Aksibot",
"Estirabot",
"Maksim-bot",
"Nallimbot",
"Image-req-proj-bot",
"AFD Bot",
"GurchBot",
"ImageBacklogBot",
"ClueBot VI",
"Uncle G's 'bot",
"PNG crusade bot",
"TPO-bot",
"DomBot",
"Ebrambot",
"Margosbot",
"StatusBot",
"Jotterbot",
"AlanBOT",
"AnkitAWB",
"EarwigBot III",
"EBot IV",
"RscprinterBot",
"DeadBot",
"Purbo T",
"SeveroBot",
"Le Pied-bot",
"NedBot",
"BodhisattvaBot",
"CountryBot",
"FileBot",
"AfDStatBot",
"MTSbot",
"ChenzwBot",
"EssjayBot",
"BenoniBot",
"SEWilcoBot",
"VedeBOT",
"YonaBot",
"MMABot",
"Martin's bot",
"WikiDreamer Bot",
"NTBot",
"Movses-bot",
"HasharBot",
"LawBot",
"Kakashi Bot",
"UcuchaBot",
"Milk's Favorite Bot",
"BotPuppet",
"Lt-wiki-bot",
"WolterBot",
"Android Mouse Bot 3",
"EBot II",
"XZeroBot",
"RefDeskBot",
"CohesionBot",
"PlangeBot",
"TuvicBot",
"Merge bot",
"Andrea105Bot",
"TinucherianBot II",
"Hxhbot",
"Skumarlabot",
"AmphBot",
"Beastie Bot",
"ClickBot",
"GeorgeMoneyBot-status",
"ZsinjBot",
"JVbot",
"NukeBot",
"GhalyBot",
"KaiserbBot",
"PlankBot",
"Nobot",
"HBC AIV helperbot 8",
"NolBot",
"WuBot",
"Ugur Basak Bot",
"Pathosbot",
"Mgmbot",
"FANSTARbot",
"Sahimrobot",
"MuZebot",
"SelectionBot",
"ARSBot",
"JamietwBot",
"EleferenBot",
"Adlerbot",
"SundarBot",
"Android Mouse Bot",
"SoxBot VI",
"AdambroBot",
"ClueBot Commons",
"People-n-photo-bot",
"OldMedcabBot",
"Image Screening Bot",
"WolfBot",
"WarddrBOT",
"ToePeu.bot",
"PolarBot",
"SoxBot VIII",
"Minsbot",
"AstaBOTh15",
"MonoBot",
"DYKBot",
"ChandlerMapBot",
"R Delivery Bot",
"Yonidebot",
"AvicBot2",
"DcoetzeeBot",
"Albambot",
"Swimmingbot-awb",
"DirlBot",
"Elissonbot",
"FiriBot",
"Josvebot",
"BepBot",
"Citation bot 3",
"MartinBotIV",
"Vini 17bot5",
"ClueBot IV",
"Taxobot 2",
"PDBbot",
"Amolbot",
"MediationBot",
"ImageTagBot",
"Ryan Vesey Bot",
"H92Bot",
"Tanhabot",
"Diego Grez Bot",
"Lucia Bot",
"Signpost Book Bot",
"Byrialbot",
"NodBot",
"Bot-Schafter",
"Bot523",
"Philosopher-Bot",
"AnomieBOT II",
"DustyBot",
"Chrisbot",
"BetBot",
"MahdiBot",
"Commons fair use upload bot",
"Blood Oath Bot",
"TottyBot",
"Kl4m-AWB",
"RFRBot",
"AstRoBot",
"AmeliorationBot",
"CeraBot",
"Bikabot",
"LDBot",
"NrhpBot",
"Bocianski.bot",
"FaleBot",
"Zxabot",
"CrazynasBot",
"IPTaggerBot",
"HarrivBOT",
"Ver-bot",
"Rfambot",
"SvickBOT",
"Kwjbot",
"Ocobot",
"KolBot",
"PascalBot",
"SpillingBot",
"CricketBot",
"SoxBot X",
"RobotJcb",
"EnzaiBot",
"ListGenBot",
"WikiBotas",
"Wybot",
"Peti610botH",
"Plasticbot",
"FPBot",
"Robert SkyBot",
"Italic title bot",
"Android Mouse Bot 4",
"GrooveBot",
"NekoBot",
"RoboServien",
"SMS Bot",
"SoxBot VII",
"AzaBot",
"BotdeSki",
"Slobot",
"Eivindbot",
"Snaevar-bot",
"AilurophobiaBot",
"DeadLinkBOT",
"BendelacBOT",
"Kisbesbot",
"Citation bot 4",
"O bot",
"Manishbot",
"AudeBot",
"SheepBot",
"Nixbot",
"WoodwardBot",
"MastersBot",
"GracenotesBot",
"AntiAbuseBot",
"WxBot",
"Janna Isabot",
"Analphabot",
"SantoshBot",
"7SeriesBOT",
"Legobot III",
"DinoBot",
"Botpankonin",
"Ficbot",
"SwiftBot",
"Rameshngbot",
"AndreasJSbot",
"SDPatrolBot II",
"EBot",
"Alirezabot",
"Razibot",
"Anibot",
"NobelBot",
"Nono le petit robot",
"Mulder416sBot",
"TARBOT",
"MCBot",
"TTObot",
"WODUPbot",
"NeuRobot",
"WaldirBot",
"Antischmitzbot",
"Taxobot",
"VP-bot",
"MedcabBot",
"ChzzBot",
"Joe's Olympic Bot",
"Fajrbot",
"ElMeBot",
"Stwalkerbot",
"SprinterBot",
"AutocracyBot",
"MartinBotII",
"Stefan2bot",
"GnawnBot",
"DpmukBOT",
"AnomieBOT III",
"MandelBot",
"Caypartisbot",
"ChessBOT",
"GZ-Bot",
"PsychAWB",
"TypoBot",
"Newsletterbot",
"Danumber1bot",
"Robotic Garden",
"Dark Shikari Bot",
"BotCompuGeek",
"DEagleBot",
"NeraBot",
"AlptaBot",
"Halibott",
"SpaceFactsBot",
"VsBot",
"Diligent Terrier Bot",
"Riccardobot",
"Kal-El-Bot",
"Luuvabot",
"UncatTemplateBot",
"Botx",
"Naudefjbot",
"DrTrigonBot",
"DrFO.Tn.Bot",
"Selmobot",
"DavidWSBot",
"HujiBot",
"BenjBot",
"BoricuaBot",
"DefconBot",
"ListManBot",
"AHbot",
"AsgardBot",
"Manubot",
"Sumibot",
"Madhubot",
"JJBot",
"RSElectionBot",
"FritzpollBot",
"KaldariBot",
"NilfaBot",
"MalarzBOT",
"Simplebot",
"AloysiusLiliusBot",
"EddieBot",
"PALZ9000",
"OrophinBot",
"AZatBot",
"Denbot",
"Milk's Favorite Bot II",
"Pfft Bot",
"SVGBot",
"VeinorBot",
"AswnBot",
"Rtz-bot",
"QOTDBot",
"MrVanBot",
"PaievBot",
"IcalaniseBot",
"QualiaBot",
"KuduBot",
"DeliveryBot",
"LSG1-Bot",
"Egmontbot",
"PCbot",
"APersonBot",
"XeBot",
"JMuniBot",
"BücherBot",
"SusBot",
"Botryoidal",
"MichaelBillingtonBot",
"The Anonybot",
"ReigneBOT",
"ChzzBot III",
"HMBot",
"Kgsbot",
"DottyQuoteBot",
"OpenlibraryBot",
"SandgemBot",
"Kaspobot",
"Kumar Appaiah Bot",
"MauchoBot",
"WMUKBot",
"SharafBot",
"Rabbot",
"Pattonbot",
"The Auto-categorizing Robot",
"SamuraiBot",
"StormBot",
"DusterBot",
"H2Bot",
"EagleAstroidBot",
"Rob110178bot",
"SpeedyBot",
"Homobot",
"SVnaGBot1",
"Lockalbot",
"GeorgeMoneyBot",
"StatsBot",
"Fettgesicht",
"CSBot",
"EBot III",
"Cherybot",
"TaeBot",
"RFC posting script",
"Project Messenger Bot",
"MotinBot",
"WilhelmBot",
"DinoSizedBot",
"DanielBot",
"DarioBot",
"Bersibot",
"Sgeo-BOT",
"ViskonBot",
"DvyBot",
"ArbComBot",
"JerryBot",
"UltraBot",
"Z-BOT",
"YekratsBot",
"EberBot",
"R. Hillgentleman",
"OrBot",
"CataBotTsirel",
"Smallbot",
"Mihas-bot",
"Orphaned image deletion bot",
"SPPatrolBot",
"Danielfolsom2.bot",
"TAP Bot",
"TFA Protector Bot",
"DRN clerk bot",
"Dpkbot",
"M-Bot",
"CleanupListingBot",
"IPLRecordsUpdateBot",
"SpebiBot",
"AwOcBot",
"Town-bot",
"TorNodeBot",
"CloudNineBot",
"SebrevBOT",
"SpellCheckerBot",
"Wikipedia Signpost",
"AEBot",
"Heikobot",
"MessengerBot",
"WASDbot",
"NVS(bot)",
"Wpp research bot",
"GrashoofdBot",
"WalkingSoulBot",
"CommonsNotification",
"CwraschkeDataBot",
"Nomenclaturebrowser",
"PC78-bot",
"SunCreatorBot",
"WillieBot",
"KyluBot",
"ChrisSalij Bot",
"Taxobot 6",
"Taxobot 3",
"Geimas5Bot",
"BsherrAWBBOT",
"MetaplasticityBot",
"AlekseyBot",
"TowBot",
"Taxobot (usurped)",
"SlakrBot",
"ZscoutBot",
"JatBot",
"Non-Free Content Compliance Bot",
"Joe's Null Bot",
"Collabsearch",
"ProcseeBot",
"AttributionBot"]

// landing page functions

module.exports.showLandingPage = function(req, res)
{
	res.render('landing.ejs')
}

// POST method, data contains in the resquest body
module.exports.signUp = function(req, res)
{
    const first = req.body.user.first;
    const last = req.body.user.last;
    const email = req.body.user.email;
    const name = req.body.user.name;
    const psw = req.body.user.psw;
    const psw2 = req.body.user.repeat;
    
    
    var data = {
        'first': first,
        'last': last,
        'email': email,
        'name': name,
        'psw': psw
    };
    
//    hash password
//    bcrypt.genSalt(10, function(err, salt) {
//        bcrypt.hash(data.psw, salt, function(err, hash) {
//            if (err) {
//                console.log(err);
//            }
//            data.psw = hash;
//        });
//    });

User.save_user_data(data, function(err, result){

    if (err) {
            // error code 11000: duplicate unique key
            if (err.code == 11000) {
                req.flash('danger', 'User already exists!');
                res.redirect('/');
            }  
        } else {
            req.flash('success', 'User registered!');
            res.redirect('/');
        }
    })       
}

module.exports.signIn = function(req, res)
{
    let data = {
        'name': req.body.user.name,
        'psw': req.body.user.psw
    };
    
    User.signIn(data, function(err, result){

        if (err) {
            console.log('Cannot sign in with error code' + err);
        } else {
            let user = result[0];
            if (user)
            {
                req.flash('success', 'Signed in!');
                res.redirect('/analytics');
            } else {
                req.flash('danger', 'Incorrect username or password!');
                res.redirect('/');
            }
        }
    })
}

module.exports.getGroupPieData = function(req, res)
{
    Promise.all([
        Revision.totalNumRevForUser('admin'),
        Revision.totalNumRevForUser('anon'),
        Revision.totalNumRevForUser('bot'),
        Revision.totalNumRevForUser('reg')
        ]).then(function(user_counts) {
            user_counts = {
                'Admin': user_counts[0],
                'Anonymous': user_counts[1],
                'Bot': user_counts[2],
                'Regular': user_counts[3]
            };
            res.json(user_counts)
        }).catch(function(err) {
            console.log("Cannot cannot get group pie data");
        });
}

module.exports.getGroupBarData = function(req, res)
{
    Revision.findByYearAndType()
    .then(function(result) {
        res.json(result);
    }).catch(function(err) {
        console.log(err);
        console.log("Cannot get group bar data");
        console.log(err)
    });
}

module.exports.getIndividualBarData = function(req, res)
{
    Revision.findByYearAndTypeForArticle(req.query.title)
    .then(function(result) {
        res.json(result);
    }).catch(function(err) {
        console.log("Cannot get individual bar data");
    })

}

module.exports.getTop5Users = function(req, res)
{
    var title = req.query.title;
    Revision.topNUsersForArticle(title, 5)
    .then(function(result) {
        res.render('templates/multi_select.ejs', {topUsers: result});
    })
    .catch(function(err) {
        console.log(err);
    })
}

module.exports.getIndividualBarDataTopUsers = function(req, res)
{
    // find the top n users for this article
    var title = req.query.title;

    // var numUsers = req.query.num_user.num_user;
    Revision.topNUsersForArticle(title, 5)
    .then(function(result) {
        // find the revision number for each user
        // generate promises
        promises = []
        user_names = []
        for (var i in result)
        {
            user_names.push(result[i]._id);
            promises.push(Revision.numRevByYear(title, user_names[i]));
        }
        Promise.all(promises)
        .then(function(user_counts) {
            var data = [];
            // unpack data
            for (var j in user_counts)
            {
                data[j] = [
                    user_names[j],
                    user_counts[j]
                ]
            }
            res.json(data);
        }).catch(function(err) {
            console.log("Cannot cannot get group pie data");
        });

    }).catch(function(err) {
        console.log('Cannot get individual user bar data');
    })
}

module.exports.getIndividualBarDataSelectedUsers = function(req, res)
{
    // find the top n users for this article
    var title = req.query.title.title;
    var users = req.query.users;

    promises = []
    for (var i in users)
    {
        promises.push(Revision.numRevByYear(title, users[i]));
    }
    Promise.all(promises)
    .then(function(user_counts) {
        var data = [];
        // unpack data
        for (var j in user_counts)
        {
            data[j] = [
                users[j],
                user_counts[j]
            ]
        }
        res.json(data);
    }).catch(function(err) {
        console.log("Cannot cannot get individual user data");
    });

}

module.exports.getIndividualPieData = function(req, res)
{
    var title = req.query.title;
    Promise.all([
        Revision.totalNumRevForUserAndArticle(title, 'admin'),
        Revision.totalNumRevForUserAndArticle(title, 'anon'),
        Revision.totalNumRevForUserAndArticle(title, 'bot'),
        Revision.totalNumRevForUserAndArticle(title, 'reg'),
        ]).then(function(user_counts) {
            user_counts = {
                'Admin': user_counts[0],
                'Anonymous': user_counts[1],
                'Bot': user_counts[2],
                'Regular': user_counts[3]
            };
            res.json(user_counts)
        }).catch(function(err) {
            console.log("Cannot count users");
        });
}

// Analytics page functions
module.exports.showAnalyticsPage = function(req, res)
{
    var highestRevRes = [];
    var lowestRevRes = [];
    var highestUniqueUserRes = [];
    var lowestUniqueUserRes = [];
    var highestAgeRes = [];
    var lowestAgeRes = [];
    
    Promise.resolve(Revision.findTitleHighestNoRev(3))
    .then(undefined, function(err) {
        console.log(err);
        highestRevRes.push({_id: "Cannot find the most revised articles!"})
    })
    .then(function(titleHighestNoRev) {
        for (let i = 0, size = titleHighestNoRev.length; i < size; i++) { 
        highestRevRes[i] = titleHighestNoRev[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestNoRev(3));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestRevRes.push({_id: "Cannot find the least revised articles!"})
    })
    .then(function(titleLowestNoRev) {
        for (let i = 0, size = titleLowestNoRev.length; i < size; i++) { 
        lowestRevRes[i] = titleLowestNoRev[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleHighestUniqueUsers(1));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        highestUniqueUserRes.push({_id: "Cannot find the most popular articles!"})
    })
    .then(function(titleHighestUniqueUsers) {
        for (let i = 0, size = titleHighestUniqueUsers.length; i < size; i++) { 
        highestUniqueUserRes[i] = titleHighestUniqueUsers[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestUniqueUsers(1));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestUniqueUserRes.push({_id: "Cannot find the least popular articles!"})
    })
    .then(function(titleLowestUniqueUsers) {
        for (let i = 0, size = titleLowestUniqueUsers.length; i < size; i++) { 
        lowestUniqueUserRes[i] = titleLowestUniqueUsers[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleHighestAge(3));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        highestAgeRes.push({title: "Cannot find the oldest articles!"});
    })
    .then(function(titleHighestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleHighestAge.length; i < size; i++) {   
            // findTitleHighestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleHighestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            highestAgeRes[i] = {title: titleHighestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestAge(3));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestAgeRes.push({title: "Cannot find the youngest articles!"});
    })
    .then(function(titleLowestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleLowestAge.length; i < size; i++) {   
            // findTitleLowestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleLowestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            lowestAgeRes[i] = {title: titleLowestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        // console.log(highestRevRes);
        // console.log(lowestRevRes);
        // console.log(highestUniqueUserRes);
        // console.log(lowestUniqueUserRes);
        // console.log(highestAgeRes);
        // console.log(lowestAgeRes);

        res.render('analytics.ejs', {top_revisions: highestRevRes, bottom_revisions: lowestRevRes, top_regUsers: highestUniqueUserRes, bottom_regUsers: lowestUniqueUserRes, oldest_articles: highestAgeRes, youngest_articles: lowestAgeRes});
    })
}

module.exports.numRevision = function(req, res)
{
    var number = Number(req.query.number);
    console.log(number);
    var highestRevRes = [];
    var lowestRevRes = [];

    Promise.resolve(Revision.findTitleHighestNoRev(number))
    .then(undefined, function(err) {
        console.log(err);
        highestRevRes.push({_id: "Cannot find the most revised articles!"})
    })
    .then(function(titleHighestNoRev) {
        for (let i = 0, size = titleHighestNoRev.length; i < size; i++) { 
        highestRevRes[i] = titleHighestNoRev[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestNoRev(number));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestRevRes.push({_id: "Cannot find the least revised articles!"})
    })
    .then(function(titleLowestNoRev) {
        for (let i = 0, size = titleLowestNoRev.length; i < size; i++) { 
        lowestRevRes[i] = titleLowestNoRev[i];
        }
    })
    .then(function() {
        res.render('templates/numrevision.ejs', { top_revisions: highestRevRes, bottom_revisions: lowestRevRes });
    })
}

module.exports.numPopular = function(req, res)
{
    var number = Number(req.query.number);
    console.log(number);
    var highestUniqueUserRes = [];
    var lowestUniqueUserRes = [];

    Promise.resolve(Revision.findTitleHighestUniqueUsers(number))
    .then(undefined, function(err) {
        console.log(err);
        highestUniqueUserRes.push({_id: "Cannot find the most popular articles!"})
    })
    .then(function(titleHighestUniqueUsers) {
        for (let i = 0, size = titleHighestUniqueUsers.length; i < size; i++) { 
        highestUniqueUserRes[i] = titleHighestUniqueUsers[i];
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestUniqueUsers(number));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestUniqueUserRes.push({_id: "Cannot find the least popular articles!"})
    })
    .then(function(titleLowestUniqueUsers) {
        for (let i = 0, size = titleLowestUniqueUsers.length; i < size; i++) { 
        lowestUniqueUserRes[i] = titleLowestUniqueUsers[i];
        }
    })
    .then(function() {
        console.log(highestUniqueUserRes);
        console.log(lowestUniqueUserRes);
        res.render('templates/popular.ejs', { top_regUsers: highestUniqueUserRes, bottom_regUsers: lowestUniqueUserRes });
    })
}

module.exports.numAge = function(req, res)
{
    var number = Number(req.query.number);
    console.log(number);
    var highestAgeRes = [];
    var lowestAgeRes = [];

    Promise.resolve(Revision.findTitleHighestAge(number))
    .then(undefined, function(err) {
        console.log(err);
        highestAgeRes.push({title: "Cannot find the oldest articles!"});
    })
    .then(function(titleHighestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleHighestAge.length; i < size; i++) {   
            // findTitleHighestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleHighestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            highestAgeRes[i] = {title: titleHighestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        return new Promise(function(resolve, reject) {
            resolve(Revision.findTitleLowestAge(number));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
        lowestAgeRes.push({title: "Cannot find the youngest articles!"});
    })
    .then(function(titleLowestAge) {
        var msecToYear = 31536000000;
        for (let i = 0, size = titleLowestAge.length; i < size; i++) {   
            // findTitleLowestAge returns title and firstRevision (timestamp as a string)
            // subtracting current date time from firstRevision returns difference in milliseconds
            // convert to years by dividing by 1000 milliseconds * 60 sec * 60 mins * 24 hrs * 365 days
            let firstRevDate = (new Date() - new Date(titleLowestAge[i].firstRevision)) / msecToYear;
            firstRevDate = firstRevDate.toFixed(2);
            lowestAgeRes[i] = {title: titleLowestAge[i]._id, age: firstRevDate};
        }
    })
    .then(function() {
        res.render('templates/age.ejs', {oldest_articles: highestAgeRes, youngest_articles: lowestAgeRes});
    })
}

module.exports.individualPage = function(req, res) 
{
    var titleList = [];
    Promise.resolve(Revision.findTitleNames())
    .then(undefined, function(err) {
        console.log(err);
        
    })
    .then(function(distinctTitles) {
        for (let i = 0, size = distinctTitles.length; i < size; i++) { 
        titleList[i] = distinctTitles[i];
        }
        // console.log(titleList);
    })
    .then(function() {
        res.render('templates/individual.ejs', {titleOptions : titleList});
    })
}

module.exports.individualResult = function(req,res)
{
    var title = req.query.title;
    var numRev;
    var topUsers = [];
    console.log(title); //why print twice???
   
    Promise.resolve(Revision.totalNumRev(title))
    .then(undefined, function(err) {
        console.log(err);  
    })
    .then(function(totalNumRev) {
        numRev = totalNumRev;
        // console.log(numRev); 
    })
    .then(function(){
        return new Promise(function(resolve, reject) {
            resolve(Revision.topRevisionRegUsers(title));
        })
    })
    .then(undefined, function(err) {
        console.log(err);
    })
    .then(function(top5RegUsers) {
        for (let i = 0, size = top5RegUsers.length; i < size; i++) { 
        topUsers[i] = top5RegUsers[i];
        }
        res.render('templates/individualresult.ejs', {title: title, numRev: numRev, topUsers: topUsers});
    })
}


module.exports.individualModal = function(req, res) 
{
    var title = req.query.title;
    var latestRevTime;

    Promise.resolve(Revision.findTitleLatestRev(title))
    .then(undefined, function(err) {
        console.log(err);  
    })
    .then(function(latestRev) {
        latestRevTime = latestRev[0].timestamp.toISOString();

        // check if data is up to date
        var ONE_DAY = 24 * 60 * 60 * 1000; // in ms
        if (((new Date) - latestRev[0].timestamp) < ONE_DAY) {
            res.render('templates/modal.ejs', {message1: "Database is up to date.", message2: "No data downloaded."});
        }else{
            client.getArticleRevisions(title, latestRevTime, function(err, data) {
                // error handling
                if (err) {
                  console.log(err);
                  return;
                } else {
                    dlNum = String(data.length - 1);
                    let adminNum = 0;
                    let botNum = 0;
                    let anonNum = 0;
                    let regNum = 0;
                    
                    for (let i = 1, size = data.length; i < size; i++) {
                        data[i]['title'] = title;
                        // create 'type' field
                        if (admin.indexOf(data[i].user) >= 0) {
                            data[i]['type'] = 'admin';
                            adminNum++;
                        }else if (bot.indexOf(data[i].user) >= 0) {
                            data[i]['type'] = 'bot';
                            botNum++;
                        }else if(data[0].hasOwnProperty('anon')) {
                            data[i]['type'] = 'anon';
                            anonNum++;
                        }else {
                            data[i]['type'] = 'reg';
                            regNum++;
                        }
                        // timestamp string to date
                        data[i].timestamp = new Date(data[i].timestamp);
    
                        // insert to db
                        var newDoc = new Revision(data[i]);
                        newDoc.save();
                    }
    
                    res.render('templates/modal.ejs', 
                    {message1: dlNum + " new revisions were downloaded.", 
                    message2: "New revisions were made by: " + regNum + " regular users, " +
                    adminNum + " admin users, " + botNum + " bot users, " + anonNum + " anonymous users."});
                }
              });
        }

    })
}