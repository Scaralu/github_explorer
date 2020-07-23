import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImage from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';
import Dashboard from '../Dashboard';
/**
 * React.FC => Function Component 
 */

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazer_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    id: number;
    title: string;
    user: {
        login: string;
    }
    html_url: string;
}

const Repository: React.FC = () => {
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issue, setIssue] = useState<Issue[]>([]);
    
    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {  
            api.get(`repos/${params.repository}`).then((response) => {
                setRepository(response.data);
            });
            api.get(`repos/${params.repository}/issues`).then((response) => {
                setIssue(response.data);
            })
    }, [params.repository])

    return (
        <>
            <Header>
                <img src={logoImage} alt='Github Explorer' />
                <Link to='/'>
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img 
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login} />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazer_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues Abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}
            
            <Issues>
                {issue.map(issue => (
                    <a key={issue.id} href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={20}/>
                    </a>
                ))}
            </Issues>
        </>
    );
}

export default Repository;