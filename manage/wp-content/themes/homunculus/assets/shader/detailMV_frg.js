//FRAGMENT

uniform sampler2D texture;
uniform sampler2D noise;
uniform sampler2D grade;
uniform sampler2D mask;
uniform float alpha;
uniform float shiftX;
uniform float darkPow;

varying vec2 vUv;

void main()
{
	vec4 col = texture2D( texture, vUv );
	vec4 gCol = texture2D( grade, vUv );
	vec4 noiseCol = texture2D( noise, vUv * 0.3 );
	vec4 maskCol = texture2D( mask, vec2(vUv.x * 0.2 + shiftX, vUv.y) );
	
	vec3 baseCol = col.rgb - max( (1.0 - gCol.r) * darkPow, 0.0 );
	vec3 darkCol = max(baseCol - noiseCol.r * 0.06, 0.0);
	
	//gl_FragColor = vec4( darkCol.rgb * (1.0 + (1.0 - maskCol.r)), col.a * alpha * maskCol.r );
	gl_FragColor = vec4( darkCol.rgb, alpha * maskCol.r - 0.1 );
}



