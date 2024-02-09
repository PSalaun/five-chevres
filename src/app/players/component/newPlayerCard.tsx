import { Player } from "@/app/lib/types";
import { useState } from "react";

interface NewPlayerCardProps {
  onSubmit: (player: Player) => void;
}
const NewPlayerCard: React.FC<NewPlayerCardProps> = ({ onSubmit }) => {
  const [openNewPlayerForm, setOpenNewPlayerForm] = useState<boolean>(false);
  const [newPlayer, setNewPlayer] = useState<Player>({
    id: 0,
    name: "",
    hat: 0,
    photo: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Appeler la fonction onSubmit du parent avec les données du formulaire
    console.log(newPlayer);
    onSubmit(newPlayer);
  };

  return (
    <div className="user-card ">
      {!openNewPlayerForm && (
        <button onClick={(e) => setOpenNewPlayerForm(true)}>
          Ajouter un nouveau joueur
        </button>
      )}

      {openNewPlayerForm && (
        <>
          <h4> Ajouter un nouveau joueur</h4>
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
              <button
                onClick={() => {
                  setOpenNewPlayerForm(false);
                }}
              >
                Close
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
export default NewPlayerCard;
