export type AgeCategory =
  | "children"
  | "teen-young-adult"
  | "adults"
  | "the-undead";

export type Category =
  | "postapocalyptic"
  | "action"
  | "adventure"
  | "art"
  | "autobiography-biographies"
  | "business"
  | "computer"
  | "contemporary"
  | "crime"
  | "detective"
  | "doctor-who-sci-fi"
  | "education"
  | "fantasy"
  | "general-fiction"
  | "historical-fiction"
  | "history"
  | "horror"
  | "lecture"
  | "lgbt"
  | "literature"
  | "litrpg"
  | "general-non-fiction"
  | "mystery"
  | "paranormal"
  | "plays-theater"
  | "poetry"
  | "political"
  | "radio-productions"
  | "romance"
  | "sci-fi"
  | "science"
  | "self-help"
  | "spiritual"
  | "sports"
  | "suspense"
  | "thriller"
  | "true-crime"
  | "tutorial"
  | "westerns";

export type CategoryModifiers =
  | "anthology"
  | "bestsellers"
  | "classic"
  | "documentary"
  | "full-cast"
  | "libertarian"
  | "military"
  | "novel"
  | "short-story";

export type Categories = AgeCategory | Category | CategoryModifiers;

export type Tags = "english" | "dutch" | "french" | "spanish" | "german";
