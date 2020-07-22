import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';


import logoImage from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);

    function handleAddRepository(event: FormEvent<HTMLFormElement>): void{
        console.log(newRepo);
    }

    return(
        <>
            <img src={logoImage} alt='Github Explorer' />
            <Title>Explore Repositórios no Github</Title>

            <Form onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder='Nome do repositório'
                />
                <button type='submit'>Pesquisar</button>
            </Form>

            <Repositories>
                <a href="#">
                    <img
                        src="https://avatars3.githubusercontent.com/u/48810662?s=400&u=c23598a03d13729c00dad2625da278516495241e&v=4" 
                        alt="Lucca Scarano"
                    />
                    <div>
                       <strong>Scaralu/Gobarber</strong>
                       <p>Easy peasy appointments with your preffered barber</p>
                    </div>

                    <FiChevronRight size={20} />
                </a>  
            </Repositories>
        </>
    );
}

export default Dashboard;

