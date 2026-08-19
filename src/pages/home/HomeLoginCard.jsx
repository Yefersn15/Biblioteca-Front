import { useHomeLoginCard } from './hooks/useHomeLoginCard';
import ResumenPrestamos from './components/ResumenPrestamos';
import FormularioIngreso from './components/FormularioIngreso';

const HomeLoginCard = () => {
  const { user, isStaff, stats, dias, email, setEmail, password, setPassword, error, loading, handleSubmit } = useHomeLoginCard();

  if (user) {
    return <ResumenPrestamos user={user} stats={stats} isStaff={isStaff} dias={dias} />;
  }

  return (
    <FormularioIngreso
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
};

export default HomeLoginCard;
