import { Player } from "@/app/players/page";
import { useState } from "react";

interface NewPlayerCardProps {
  onSubmit: (player: Player) => void;
  onClose: () => void;
}
const NewPlayerCard: React.FC<NewPlayerCardProps> = ({ onSubmit, onClose }) => {
  const [newPlayer, setNewPlayer] = useState<Player>({
    id: 0,
    name: "",
    hat: 0,
    profilPicture: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
    console.log(name, value);
  };

  const handleHat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);
    setNewPlayer({ ...newPlayer, [name]: value });
    console.log(name, value);
  };
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Appeler la fonction onSubmit du parent avec les données du formulaire
    console.log(newPlayer);
    onSubmit(newPlayer);
  };

  return (
    <div className="new-user-card ">
      <h1> Ajouter un nouveau joueur</h1>
      <form onSubmit={handleSubmit} className="new-user-card-content ">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newPlayer.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hat">Chapeau:</label>
          <input
            type="number"
            id="hat"
            name="hat"
            value={newPlayer.hat}
            onChange={handleHat}
            required
          />
        </div>
        <div>
          <button type="submit">Create Player</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </form>
    </div>
  );
};
export default NewPlayerCard;
