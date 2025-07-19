import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  flex-flow: row nowrap;
  flex-flow: row nowrap;
  text-align: left;
  color: black;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px 0;
  border-radius: 24px;
  height: 320px;
`

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SearchSection = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`

export const HintBox = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`

export const HintPill = styled.div`
  background-color: var(--gray-light);
  color: var(--dark);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  background-color: #d1dce9;

  &:hover {
    background-color: #d9d9d9;
  }
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.dark};
`

export const Title = styled.h1`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 10px;
`

export const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`
export const Menu = styled.div`
  display: flex;
  gap: 15px;
  list-style: none;
`

export const MenuItem = styled.li``

export const LinkItem = styled.a`
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  padding: 8px 15px;
  border-radius: var(--radius-md);
  transition: var(--transition);

  &:hover {
    background: var(--gray-light);
  }
`

export const LogoIcon = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.primary};
`

export const LogoText = styled.div`
  font-size: 24px;
  font-weight: 700;
`

export const LogoSubtext = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray};
`
