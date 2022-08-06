export default function BobMemeFace(outageHours: number) {
  if (outageHours == 0)
    return (
      <picture id="alive">
        <source srcSet="images/alive.webp" type="image/webp" />
        <source srcSet="images/alive.jpg" type="image/jpeg" />
        <img src="images/alive.jpg" />
      </picture>
    );
  else
    return (
      <picture id="dead">
        <source srcSet="images/dead.webp" type="image/webp" />
        <source srcSet="images/dead.jpg" type="image/jpeg" />
        <img src="images/dead.jpg" />
      </picture>
    );
}
