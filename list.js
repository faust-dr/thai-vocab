numbers = [
	{ german: "1", thai: "๑", pronunciation: "nüng" },
	{ german: "2", thai: "๒", pronunciation: "song" },
	{ german: "3", thai: "๓", pronunciation: "sahm" },
	{ german: "4", thai: "๔", pronunciation: "si" },
	{ german: "5", thai: "๕", pronunciation: "hah" },
	{ german: "6", thai: "๖", pronunciation: "hok" },
	{ german: "7", thai: "๗", pronunciation: "jet" },
	{ german: "8", thai: "๘", pronunciation: "bäht" },
	{ german: "9", thai: "๙", pronunciation: "gao" },
	{ german: "10", thai: "๑๐", pronunciation: "sip" }
]

lowConsonants1 = [
	{ german: "n", thai: "น", pronunciation: "no (low)" },
	{ german: "m", thai: "ม", pronunciation: "mo (low)" },
	{ german: "ng", thai: "ง", pronunciation: "ngo (low)" },
	{ german: "r", thai: "ร", pronunciation: "ro (low)" },
	{ german: "l", thai: "ล", pronunciation: "lo (low)" },
	{ german: "y", thai: "ย", pronunciation: "yo (low)" },
	{ german: "w", thai: "ว", pronunciation: "wo (low)" }
]

lowConsonants2 = [
	{ german: "k", thai: "ค", pronunciation: "ko (low)" },
	{ german: "ch", thai: "ช", pronunciation: "cho (low)" },
	{ german: "s", thai: "ซ", pronunciation: "so (low)" },
	{ german: "t", thai: "ท", pronunciation: "to (low)" },
	{ german: "p", thai: "พ", pronunciation: "po (low)" },
	{ german: "f", thai: "ฟ", pronunciation: "fo (low)" }
]

midConsonants = [
	{ german: "g", thai: "ก", pronunciation: "go (mid)" },
	{ german: "j", thai: "จ", pronunciation: "jo (mid)" },
	{ german: "d", thai: "ด", pronunciation: "do (mid)" },
	{ german: "dt", thai: "ต", pronunciation: "dto (mid)" },
	{ german: "b", thai: "บ", pronunciation: "bo (mid)" },
	{ german: "bp", thai: "ป", pronunciation: "bpo (mid)" },
	{ german: "oh", thai: "อ", pronunciation: "oh (mid)" }
]
 
hiConsonants = [
	{ german: "k", thai: "ข", pronunciation: "ko (hi)" },
	{ german: "ch", thai: "ฉ", pronunciation: "cho (hi)" },
	{ german: "t", thai: "ถ", pronunciation: "to (hi)" },
	{ german: "p", thai: "ผ", pronunciation: "po (hi)" },
	{ german: "f", thai: "ฝ", pronunciation: "fo (hi)" },
	{ german: "s", thai: "ศ", pronunciation: "so (hi)" },
	{ german: "s", thai: "ษ", pronunciation: "so (hi)" },
	{ german: "s", thai: "ส", pronunciation: "so (hi)" },
	{ german: "h", thai: "ห", pronunciation: "ho (hi)" }
]
 
vowels1 = [
	{ german: "ah", thai: "-า", pronunciation: "ah" },
	{ german: "am", thai: "- ำ", pronunciation: "am" },
	{ german: "a", thai: " ั", pronunciation: "a" },
	{ german: "oh", thai: "-อ", pronunciation: "oh" },
	{ german: "ay", thai: "-าย", pronunciation: "ay" },
	{ german: "ao", thai: "-าว", pronunciation: "ao" }
]

vowels2 = [
	{ german: "ai", thai: "ไ-", pronunciation: "ai" },
	{ german: "ai", thai: "ใ-", pronunciation: "ai" },
	{ german: "oh", thai: "โ-", pronunciation: "oh" },
	{ german: "i", thai: "- ิ", pronunciation: "i" },
	{ german: "ih", thai: "- ีี", pronunciation: "ih" },
	{ german: "u", thai: "- ุ", pronunciation: "u" },
	{ german: "uh", thai: "- ู", pronunciation: "uh" }
]
 
vowels3 = [
	{ german: "ö", thai: "- ึ", pronunciation: "ö" },
	{ german: "öh", thai: "- ื", pronunciation: "öh" },
	{ german: "eh", thai: "เ-", pronunciation: "eh" },
	{ german: "äh", thai: "แ-", pronunciation: "äh" }
]

wordsChapter1 = [
	{ english: "hello", thai: "สวัสดี", pronunciation: "sa-wat di" },
	{ explanation: "(male polite particle)", thai: "ครับ", pronunciation: "krap" },
	{ english: ["miss", "mrs", "mr", "ms", "you"], thai: "คุณ", pronunciation: "kun" },
	{ explanation: "(female polite particle)", thai: "ค่ะ", pronunciation: "ka" },
	{ english: "where are you going?", thai: "ไปไหน", pronunciation: "bpai nai?" },
	{ english: "going out", thai: "ไปเที่ยว", pronunciation: "bpai ti-o" },
	{ english: "going on business", thai: "ไปธุระ", pronunciation: "bpai tu-ra" },
]

wordsChapter2 = [
	{ explanation: "I (male)", english: "i", thai: "ผม", pronunciation: "pom" },
	{ english: ["to have first name", "first name"], thai: "ชื่อ", pronunciation: "chöh" },
	{ english: "family name", thai: "นๅมสกุล", pronunciation: "nahm sa-gun" },
	{ english: "to be", thai: "เป็น", pronunciation: "bpen" },
	{ english: "person", thai: "คน", pronunciation: "kon" },
	{ english: "english", thai: "อังกฤษ", pronunciation: "ang-grit" },
	{ english: "to come from", thai: "มๅจๅก", pronunciation: "mah jahk" },
	{ explanation: "I (female, formal)", english: "i", thai: "ดิฉัน", pronunciation: "di-chan" },
	{ english: "thai person", thai: "คนไทย", pronunciation: "kon tai" },
	{ english: "bangkok", thai: "กรุงเทพ?", pronunciation: "grung-tep" },
	{ english: "the north", thai: "ภๅคเหนือ", pronunciation: "pahk nöh-a" },
	{ english: "chiangmai", thai: "เชียงใหม", pronunciation: "chi-ang mai" },
	{ english: "country", thai: "ประเทศ", pronunciation: "bpra-teht" },
	{ english: "japan", thai: "ญี่ปุ่น", pronunciation: "yih-bpun" },
	{ english: ["am not a", "is not a", "are not a"], thai: "ไม่ใช่", pronunciation: "mai chai" },
	{ english: "what?", thai: "อะไร", pronunciation: "a-rai" },
	{ english: "is that right?", thai: "ใช่ไหม", pronunciation: "chai mai?" },
	{ explanation: "yes (to a 'chai mai?' question)", english: "yes", thai: "ใช่", pronunciation: "chai" },
	{ english: "nation", thai: "ชๅติ", pronunciation: "chaht" },
	{ explanation: "no (to a 'chai mai?' question)", english: "no", thai: "ไม่ใช่", pronunciation: "mai chai" },
	{ explanation: "I (female, informal)", english: "i", thai: "ฉัน", pronunciation: "chan" },
	{ english: ["he", "she", "they"], thai: "เขๅ", pronunciation: "kao" },
	{ english: "we", thai: "เรๅ", pronunciation: "rao" },
	{ english: "china", thai: "ประเทศจีน", pronunciation: "bpra-teht jihn" },
	{ english: "thailand", thai: "ประเทสไทย", pronunciation: "bra-teht tai" },
	{ english: "thailand", thai: "เมืองไทย", pronunciation: "möh-ang tai" },
	{ english: "an english person", thai: "คนอังกฤษ", pronunciation: "kon ang-grit" },
	{ english: "a northener", thai: "คนภๅคเหนือ", pronunciation: "kon pahk nöh-ah" },
	{ english: "a person from chiangmai", thai: "คนเชียงใหม่", pronunciation: "kon chih-ang mai" },
	{ english: "the central region", thai: "ภๅคกลๅง", pronunciation: "pahk glahng" },
	{ english: "the south", thai: "ภๅคใต้", pronunciation: "pahk dtai" },
	{ english: "the north", thai: "ภๅคเหนือ", pronunciation: "pahk nöh-ah" },
	{ english: "the northeast", thai: "ภๅคอีสๅน", pronunciation: "pahk ih-sahn" },
]

template = [
	{ english: "", thai: "", pronunciation: "" },
]

everyLesson = [
	{ name: "Numbers", contents: numbers },
	{ name: "Low consonants 1", contents: lowConsonants1 },
	{ name: "Low consonants 2", contents: lowConsonants2 },
	{ name: "Mid consonants", contents: midConsonants },
	{ name: "High consonants", contents: hiConsonants },
	{ name: "Vowels 1", contents: vowels1 },
	{ name: "Vowels 2", contents: vowels2 },
	{ name: "Vowels 3", contents: vowels3 },
	{ name: "Words from chapter 1", contents: wordsChapter1 },
	{ name: "Words from chapter 2", contents: wordsChapter2 },
]
