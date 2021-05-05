import styled from 'styled-components';

interface IProp {
    theme: 'light' | 'dark';
}
  

export const HeaderContainer = styled.div<IProp>`
    height: 6.5rem;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2rem 4rem;
    @media (max-width: 1000px){
        padding: 2px 10px;
        img {
            width: 15rem;
            margin: 0 10px 0 0;
        }
    }
    @media (max-width:767px){
        flex: 0 0 33.333333%;
    }

    background:${({theme}) => theme === 'light' ? '#ffffff': '#191622'}
    .buttonTheme{
        font-family: Lexend, sans-serif;
        font-weight: 600;
        padding: 0.5rem;
        border-radius: 1rem;
        cursor: pointer;
    }

    &.light {
        background: var(--white) ;
        border-bottom: 1px solid var(--gray-100);
        
        .buttonTheme {
            background: var(--white);
            border: 1px solid var(--orange-500);
            color: var(--orange-500);
        }
    }
    &.dark {
        background: var(--black);
        color: var(--white);
        .buttonTheme {
            background: var(--orange-500);
            border: 1px solid var(--orange-500);
            color: var(--white);
        }
    }

`;

export const Title = styled.p`
    margin-left: 2rem;
        padding: 0.25rem 0 0.25rem 2rem;
        border-left:  1px solid var(--gray-100);
        @media (max-width: 1000px){
            margin-left: 0;
            padding: 0.25rem 0 0.25rem 1rem;
            text-align: center;
        }
        @media (max-width:767px){
            display: none;
        }
`;

export const SubTitle = styled.span`
    margin-left: auto;
    margin-right: 2rem;
    text-transform: capitalize;
`;

export const Button = styled.span`
    font-family: Lexend, sans-serif;
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 1rem;
    cursor: pointer;
`;
