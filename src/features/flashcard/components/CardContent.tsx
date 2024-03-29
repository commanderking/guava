import { Card, CardAttribute } from "src/features/flashcard/types";

type ContentProps = {
  attribute: CardAttribute;
  card: Card;
};

const AttributeContent = ({ attribute, card }: ContentProps) => {
  if (attribute === "audio") {
    return <audio autoPlay controls src={card.audio} />;
  }

  return (
    <div>
      <span className="text-xl">{card[attribute]}</span>
    </div>
  );
};

type CardContentProps = {
  sideAttributes: CardAttribute[];
  card: Card;
};

const CardContent = ({ sideAttributes, card }: CardContentProps) => {
  return (
    <div>
      {sideAttributes.map((attribute) => {
        return (
          <AttributeContent key={attribute} attribute={attribute} card={card} />
        );
      })}
    </div>
  );
};

export default CardContent;
