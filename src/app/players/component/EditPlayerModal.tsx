'use client';

import { editPlayer } from '@/app/lib/actions';
import { Player } from '@/app/lib/types';
import { useState } from 'react';
// @ts-expect-error
const EditPlayerModal: React.FC<{}> = ({
  player,
  closeModal,
}: {
  closeModal: () => void;
  player: Player;
}) => {
  // @ts-expect-error
  const [updatedPlayer, setUpdatedPlayer] = useState<Player>({
    id: player.id,
    name: player.name,
    tier: player.tier,
    photo: player.photo,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUpdatedPlayer({ ...updatedPlayer, name: value });
  };

  const handleTier = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // @ts-expect-error
    setUpdatedPlayer({ ...updatedPlayer, tier: value });
  };

  const onSubmit = () => {
    //console.log(updatedPlayer);
    editPlayer(updatedPlayer);
    closeModal();
  };
  return (
    <div>
      <form onSubmit={onSubmit} className='new-user-card-content '>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={updatedPlayer.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='tier'>Chapeau:</label>
          <input
            type='number'
            id='tier'
            name='tier'
            value={updatedPlayer.tier}
            onChange={handleTier}
            required
          />
        </div>
        <div>
          <button onClick={() => onSubmit()}>Submit</button>
        </div>
      </form>
    </div>
  );
};
export default EditPlayerModal;
