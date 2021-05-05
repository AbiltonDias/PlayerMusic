import styled from 'styled-components';

export const Homepage = styled.div`
    padding: 0 4rem;
    height: calc(100vh - 6.5rem);
    overflow-y: scroll;

    @media (max-width: 1000px){
        padding: 0 4rem;
        height: auto;
        overflow-y: hidden;
    } 

    @media (max-width: 767px){
        padding: 0 0.5rem;
        height: auto;
        overflow-y: hidden;
    } 

    h2 {
        margin-top: 2rem;
        margin-bottom: 1.5rem;
    }

    &.light{
        background: var(--white);
    }
    &.dark{
        background: var(--black);
        color: var(--white);
        h2 {
            color: var(--white);
        }

        a {
            color: var(--white);
        }

        table {
            th {
                color: var(--white);
            }
        }

        
    }
`;