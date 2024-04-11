export default function Home( {token} ) {
  return (
    <div>
      <h2>Welcome to the Fake Store!</h2>
      {token && (<h3>Good to see you again. </h3>)}
    </div>
  );
}
