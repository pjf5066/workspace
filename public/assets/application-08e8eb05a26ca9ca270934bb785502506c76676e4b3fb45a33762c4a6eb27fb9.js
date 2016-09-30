/*!
 * jQuery JavaScript Library v1.12.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-01-08T19:56Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// we once tried to use readyState "interactive" here,
		// but it caused issues like the one
		// discovered by ChrisS here:
		// http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			// Subtract offsetParent scroll positions
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
				offsetParent.scrollTop();
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
				offsetParent.scrollLeft();
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0].elements).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
(function(){var x,r,q,y,I,J,K,L,M,N,O,P,z,p,A,Q,R,S,T,U,V;O=function(b){var a,d;d=[];for(a in b)d.push(a);return 0===d.length};z=function(b,a){return b.push.apply(b,a)};U=function(b,a){var d,c,e,f,g;f=b.split("");g=[];c=0;for(e=f.length;c<e;c++)d=f[c],g.push(a[d]||d);return g.join("")};Q=function(b,a){var d,c,e,f;c=[];e=0;for(f=a.length;e<f;e++)d=a[e],z(c,d(b));return c.sort(function(b,a){return b.i-a.i||b.j-a.j})};M=function(b,a){var d,c,e,f,g,h,i,j,k;h=[];e=b.length;f=b.toLowerCase();for(d=j=0;0<=
e?j<e:j>e;d=0<=e?++j:--j)for(c=k=d;d<=e?k<e:k>e;c=d<=e?++k:--k)if(f.slice(d,+c+1||9E9)in a)i=f.slice(d,+c+1||9E9),g=a[i],h.push({pattern:"dictionary",i:d,j:c,token:b.slice(d,+c+1||9E9),matched_word:i,rank:g});return h};q=function(b){var a,d,c,e,f;d={};a=1;e=0;for(f=b.length;e<f;e++)c=b[e],d[c]=a,a+=1;return d};r=function(b,a){return function(d){var c,e,f;c=M(d,a);e=0;for(f=c.length;e<f;e++)d=c[e],d.dictionary_name=b;return c}};A={a:["4","@"],b:["8"],c:["(","{","[","<"],e:["3"],g:["6","9"],i:["1",
    "!","|"],l:["1","|","7"],o:["0"],s:["$","5"],t:["+","7"],x:["%"],z:["2"]};R=function(b){var a,d,c,e,f;d={};f=b.split("");c=0;for(e=f.length;c<e;c++)b=f[c],d[b]=!0;b={};for(a in A){e=A[a];var g=f=void 0,h=void 0,h=[];f=0;for(g=e.length;f<g;f++)c=e[f],c in d&&h.push(c);c=h;0<c.length&&(b[a]=c)}return b};P=function(b){var a,d,c,e,f,g,h,i,j,k,l,m,o;f=function(){var a;a=[];for(e in b)a.push(e);return a}();j=[[]];d=function(a){var b,c,d,f,g,i,h,j;c=[];f={};h=0;for(j=a.length;h<j;h++)g=a[h],b=function(){var b,
    a,c;c=[];i=b=0;for(a=g.length;b<a;i=++b)e=g[i],c.push([e,i]);return c}(),b.sort(),d=function(){var a,c,d;d=[];i=a=0;for(c=b.length;a<c;i=++a)e=b[i],d.push(e+","+i);return d}().join("-"),d in f||(f[d]=!0,c.push(g));return c};c=function(a){var e,f,g,i,h,k,l,o,m,n,r,q,p;if(a.length){f=a[0];h=a.slice(1);i=[];q=b[f];l=0;for(n=q.length;l<n;l++){a=q[l];o=0;for(r=j.length;o<r;o++){k=j[o];e=-1;g=m=0;for(p=k.length;0<=p?m<p:m>p;g=0<=p?++m:--m)if(k[g][0]===a){e=g;break}-1===e?(e=k.concat([[a,f]]),i.push(e)):
    (g=k.slice(0),g.splice(e,1),g.push([a,f]),i.push(k),i.push(g))}}j=d(i);return c(h)}};c(f);i=[];k=0;for(m=j.length;k<m;k++){g=j[k];h={};l=0;for(o=g.length;l<o;l++)a=g[l],f=a[0],a=a[1],h[f]=a;i.push(h)}return i};T=function(b,a,d){var c,e,f,g,h,i,j,k,l,m,o,s,n;l=[];for(i=0;i<b.length-1;){j=i+1;k=null;for(m=o=0;;){c=b.charAt(j-1);h=!1;g=-1;e=a[c]||[];if(j<b.length){f=b.charAt(j);s=0;for(n=e.length;s<n;s++)if(c=e[s],g+=1,c&&-1!==c.indexOf(f)){h=!0;1===c.indexOf(f)&&(m+=1);k!==g&&(o+=1,k=g);break}}if(h)j+=
    1;else{2<j-i&&l.push({pattern:"spatial",i:i,j:j-1,token:b.slice(i,j),graph:d,turns:o,shifted_count:m});i=j;break}}}return l};x={lower:"abcdefghijklmnopqrstuvwxyz",upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",digits:"01234567890"};S=function(b,a){var d,c;c=[];for(d=1;1<=a?d<=a:d>=a;1<=a?++d:--d)c.push(b);return c.join("")};p=function(b,a){var d,c;for(c=[];;){d=b.match(a);if(!d)break;d.i=d.index;d.j=d.index+d[0].length-1;c.push(d);b=b.replace(d[0],S(" ",d[0].length))}return c};N=/\d{3,}/;V=/19\d\d|200\d|201\d/;
    L=function(b){var a,d,c,e,f,g,h,i,j,k,l,m,o,s;e=[];s=p(b,/\d{4,8}/);k=0;for(m=s.length;k<m;k++){g=s[k];h=[g.i,g.j];g=h[0];h=h[1];c=b.slice(g,+h+1||9E9);a=c.length;d=[];6>=c.length&&(d.push({daymonth:c.slice(2),year:c.slice(0,2),i:g,j:h}),d.push({daymonth:c.slice(0,a-2),year:c.slice(a-2),i:g,j:h}));6<=c.length&&(d.push({daymonth:c.slice(4),year:c.slice(0,4),i:g,j:h}),d.push({daymonth:c.slice(0,a-4),year:c.slice(a-4),i:g,j:h}));c=[];l=0;for(o=d.length;l<o;l++)switch(a=d[l],a.daymonth.length){case 2:c.push({day:a.daymonth[0],
        month:a.daymonth[1],year:a.year,i:a.i,j:a.j});break;case 3:c.push({day:a.daymonth.slice(0,2),month:a.daymonth[2],year:a.year,i:a.i,j:a.j});c.push({day:a.daymonth[0],month:a.daymonth.slice(1,3),year:a.year,i:a.i,j:a.j});break;case 4:c.push({day:a.daymonth.slice(0,2),month:a.daymonth.slice(2,4),year:a.year,i:a.i,j:a.j})}l=0;for(o=c.length;l<o;l++)a=c[l],f=parseInt(a.day),i=parseInt(a.month),j=parseInt(a.year),f=y(f,i,j),d=f[0],j=f[1],f=j[0],i=j[1],j=j[2],d&&e.push({pattern:"date",i:a.i,j:a.j,token:b.slice(g,
        +h+1||9E9),separator:"",day:f,month:i,year:j})}return e};J=/(\d{1,2})(\s|-|\/|\\|_|\.)(\d{1,2})\2(19\d{2}|200\d|201\d|\d{2})/;I=/(19\d{2}|200\d|201\d|\d{2})(\s|-|\/|\\|_|\.)(\d{1,2})\2(\d{1,2})/;K=function(b){var a,d,c,e,f,g,h,i,j,k;e=[];j=p(b,J);g=0;for(i=j.length;g<i;g++)c=j[g],k=function(){var a,b,e,f;e=[1,3,4];f=[];a=0;for(b=e.length;a<b;a++)d=e[a],f.push(parseInt(c[d]));return f}(),c.day=k[0],c.month=k[1],c.year=k[2],c.sep=c[2],e.push(c);j=p(b,I);g=0;for(i=j.length;g<i;g++)c=j[g],k=function(){var a,
        b,e,f;e=[4,3,1];f=[];a=0;for(b=e.length;a<b;a++)d=e[a],f.push(parseInt(c[d]));return f}(),c.day=k[0],c.month=k[1],c.year=k[2],c.sep=c[2],e.push(c);k=[];i=0;for(j=e.length;i<j;i++)c=e[i],a=y(c.day,c.month,c.year),g=a[0],h=a[1],a=h[0],f=h[1],h=h[2],g&&k.push({pattern:"date",i:c.i,j:c.j,token:b.slice(c.i,+c.j+1||9E9),separator:c.sep,day:a,month:f,year:h});return k};y=function(b,a,d){12<=a&&31>=a&&12>=b&&(a=[a,b],b=a[0],a=a[1]);return 31<b||12<a||!(1900<=d&&2019>=d)?[!1,[]]:[!0,[b,a,d]]};var W,X,Y,Z,
        C,$,aa,ba,ca,da,ea,fa,ga,ha,n,ia,u,ja,D,ka,la,ma;u=function(b,a){var d,c,e;if(a>b)return 0;if(0===a)return 1;for(d=e=c=1;1<=a?e<=a:e>=a;d=1<=a?++e:--e)c*=b,c/=d,b-=1;return c};n=function(b){return Math.log(b)/Math.log(2)};ia=function(b,a){var d,c,e,f,g,h,i,j,k,l,m;c=C(b);k=[];d=[];f=i=0;for(m=b.length;0<=m?i<m:i>m;f=0<=m?++i:--i){k[f]=(k[f-1]||0)+n(c);d[f]=null;j=0;for(l=a.length;j<l;j++)h=a[j],h.j===f&&(g=[h.i,h.j],e=g[0],g=g[1],e=(k[e-1]||0)+$(h),e<k[g]&&(k[g]=e,d[g]=h))}i=[];for(f=b.length-1;0<=
    f;)(h=d[f])?(i.push(h),f=h.i-1):f-=1;i.reverse();d=function(a,d){return{pattern:"bruteforce",i:a,j:d,token:b.slice(a,+d+1||9E9),entropy:n(Math.pow(c,d-a+1)),cardinality:c}};f=0;j=[];l=0;for(m=i.length;l<m;l++)h=i[l],g=[h.i,h.j],e=g[0],g=g[1],0<e-f&&j.push(d(f,e-1)),f=g+1,j.push(h);f<b.length&&j.push(d(f,b.length-1));i=j;h=k[b.length-1]||0;f=fa(h);return{password:b,entropy:D(h,3),match_sequence:i,crack_time:D(f,3),crack_time_display:ea(f),score:aa(f)}};D=function(b,a){return Math.round(b*Math.pow(10,
                a))/Math.pow(10,a)};fa=function(b){return 5.0E-5*Math.pow(2,b)};aa=function(b){return b<Math.pow(10,2)?0:b<Math.pow(10,4)?1:b<Math.pow(10,6)?2:b<Math.pow(10,8)?3:4};$=function(b){var a;if(null!=b.entropy)return b.entropy;a=function(){switch(b.pattern){case "repeat":return ja;case "sequence":return ka;case "digits":return da;case "year":return ma;case "date":return ba;case "spatial":return la;case "dictionary":return ca}}();return b.entropy=a(b)};ja=function(b){var a;a=C(b.token);return n(a*b.token.length)};
    ka=function(b){var a;a=b.token.charAt(0);a="a"===a||"1"===a?1:a.match(/\d/)?n(10):a.match(/[a-z]/)?n(26):n(26)+1;b.ascending||(a+=1);return a+n(b.token.length)};da=function(b){return n(Math.pow(10,b.token.length))};ma=function(){return n(119)};ba=function(b){var a;a=100>b.year?n(37200):n(44268);b.separator&&(a+=2);return a};la=function(b){var a,d,c,e,f,g,h,i,j,k;"qwerty"===(c=b.graph)||"dvorak"===c?(h=na,d=oa):(h=pa,d=qa);f=0;a=b.token.length;i=b.turns;for(c=j=2;2<=a?j<=a:j>=a;c=2<=a?++j:--j){g=Math.min(i,
        c-1);for(e=k=1;1<=g?k<=g:k>=g;e=1<=g?++k:--k)f+=u(c-1,e-1)*h*Math.pow(d,e)}d=n(f);if(b.shifted_count){a=b.shifted_count;b=b.token.length-b.shifted_count;c=e=f=0;for(g=Math.min(a,b);0<=g?e<=g:e>=g;c=0<=g?++e:--e)f+=u(a+b,c);d+=n(f)}return d};ca=function(b){b.base_entropy=n(b.rank);b.uppercase_entropy=ha(b);b.l33t_entropy=ga(b);return b.base_entropy+b.uppercase_entropy+b.l33t_entropy};Z=/^[A-Z][^A-Z]+$/;Y=/^[^A-Z]+[A-Z]$/;X=/^[^a-z]+$/;W=/^[^A-Z]+$/;ha=function(b){var a,d,c,e,f,g,h;f=b.token;if(f.match(W))return 0;
        e=[Z,Y,X];a=0;for(c=e.length;a<c;a++)if(b=e[a],f.match(b))return 1;a=function(){var a,b,c,e;c=f.split("");e=[];a=0;for(b=c.length;a<b;a++)d=c[a],d.match(/[A-Z]/)&&e.push(d);return e}().length;b=function(){var a,b,c,e;c=f.split("");e=[];a=0;for(b=c.length;a<b;a++)d=c[a],d.match(/[a-z]/)&&e.push(d);return e}().length;c=g=e=0;for(h=Math.min(a,b);0<=h?g<=h:g>=h;c=0<=h?++g:--g)e+=u(a+b,c);return n(e)};ga=function(b){var a,d,c,e,f,g,h,i,j,k;if(!b.l33t)return 0;f=0;j=b.sub;for(g in j){h=j[g];a=function(){var a,
        d,e,f;e=b.token.split("");f=[];a=0;for(d=e.length;a<d;a++)c=e[a],c===g&&f.push(c);return f}().length;d=function(){var a,d,e,f;e=b.token.split("");f=[];a=0;for(d=e.length;a<d;a++)c=e[a],c===h&&f.push(c);return f}().length;e=i=0;for(k=Math.min(d,a);0<=k?i<=k:i>=k;e=0<=k?++i:--i)f+=u(d+a,e)}return n(f)||1};C=function(b){var a,d,c,e,f,g,h,i;f=[!1,!1,!1,!1,!1];c=f[0];g=f[1];d=f[2];e=f[3];f=f[4];i=b.split("");b=0;for(h=i.length;b<h;b++)a=i[b],a=a.charCodeAt(0),48<=a&&57>=a?d=!0:65<=a&&90>=a?g=!0:97<=a&&
    122>=a?c=!0:127>=a?e=!0:f=!0;b=0;d&&(b+=10);g&&(b+=26);c&&(b+=26);e&&(b+=33);f&&(b+=100);return b};ea=function(b){return 60>b?"instant":3600>b?""+(1+Math.ceil(b/60))+" minutes":86400>b?""+(1+Math.ceil(b/3600))+" hours":2678400>b?""+(1+Math.ceil(b/86400))+" days":32140800>b?""+(1+Math.ceil(b/2678400))+" months":321408E4>b?""+(1+Math.ceil(b/32140800))+" years":"centuries"};var E={"!":["`~",null,null,"2@","qQ",null],'"':[";:","[{","]}",null,null,"/?"],"#":["2@",null,null,"4$","eE","wW"],$:["3#",null,
        null,"5%","rR","eE"],"%":["4$",null,null,"6^","tT","rR"],"&":["6^",null,null,"8*","uU","yY"],"'":[";:","[{","]}",null,null,"/?"],"(":["8*",null,null,"0)","oO","iI"],")":["9(",null,null,"-_","pP","oO"],"*":["7&",null,null,"9(","iI","uU"],"+":["-_",null,null,null,"]}","[{"],",":["mM","kK","lL",".>",null,null],"-":["0)",null,null,"=+","[{","pP"],".":[",<","lL",";:","/?",null,null],"/":[".>",";:","'\"",null,null,null],"0":["9(",null,null,"-_","pP","oO"],1:["`~",null,null,"2@","qQ",null],2:["1!",null,
        null,"3#","wW","qQ"],3:["2@",null,null,"4$","eE","wW"],4:["3#",null,null,"5%","rR","eE"],5:["4$",null,null,"6^","tT","rR"],6:["5%",null,null,"7&","yY","tT"],7:["6^",null,null,"8*","uU","yY"],8:["7&",null,null,"9(","iI","uU"],9:["8*",null,null,"0)","oO","iI"],":":"lL,pP,[{,'\",/?,.>".split(","),";":"lL,pP,[{,'\",/?,.>".split(","),"<":["mM","kK","lL",".>",null,null],"=":["-_",null,null,null,"]}","[{"],">":[",<","lL",";:","/?",null,null],"?":[".>",";:","'\"",null,null,null],"@":["1!",null,null,"3#",
        "wW","qQ"],A:[null,"qQ","wW","sS","zZ",null],B:["vV","gG","hH","nN",null,null],C:["xX","dD","fF","vV",null,null],D:"sS,eE,rR,fF,cC,xX".split(","),E:"wW,3#,4$,rR,dD,sS".split(","),F:"dD,rR,tT,gG,vV,cC".split(","),G:"fF,tT,yY,hH,bB,vV".split(","),H:"gG,yY,uU,jJ,nN,bB".split(","),I:"uU,8*,9(,oO,kK,jJ".split(","),J:"hH,uU,iI,kK,mM,nN".split(","),K:"jJ iI oO lL ,< mM".split(" "),L:"kK oO pP ;: .> ,<".split(" "),M:["nN","jJ","kK",",<",null,null],N:["bB","hH","jJ","mM",null,null],O:"iI,9(,0),pP,lL,kK".split(","),
        P:"oO,0),-_,[{,;:,lL".split(","),Q:[null,"1!","2@","wW","aA",null],R:"eE,4$,5%,tT,fF,dD".split(","),S:"aA,wW,eE,dD,xX,zZ".split(","),T:"rR,5%,6^,yY,gG,fF".split(","),U:"yY,7&,8*,iI,jJ,hH".split(","),V:["cC","fF","gG","bB",null,null],W:"qQ,2@,3#,eE,sS,aA".split(","),X:["zZ","sS","dD","cC",null,null],Y:"tT,6^,7&,uU,hH,gG".split(","),Z:[null,"aA","sS","xX",null,null],"[":"pP,-_,=+,]},'\",;:".split(","),"\\":["]}",null,null,null,null,null],"]":["[{","=+",null,"\\|",null,"'\""],"^":["5%",null,null,"7&",
            "yY","tT"],_:["0)",null,null,"=+","[{","pP"],"`":[null,null,null,"1!",null,null],a:[null,"qQ","wW","sS","zZ",null],b:["vV","gG","hH","nN",null,null],c:["xX","dD","fF","vV",null,null],d:"sS,eE,rR,fF,cC,xX".split(","),e:"wW,3#,4$,rR,dD,sS".split(","),f:"dD,rR,tT,gG,vV,cC".split(","),g:"fF,tT,yY,hH,bB,vV".split(","),h:"gG,yY,uU,jJ,nN,bB".split(","),i:"uU,8*,9(,oO,kK,jJ".split(","),j:"hH,uU,iI,kK,mM,nN".split(","),k:"jJ iI oO lL ,< mM".split(" "),l:"kK oO pP ;: .> ,<".split(" "),m:["nN","jJ","kK",",<",
            null,null],n:["bB","hH","jJ","mM",null,null],o:"iI,9(,0),pP,lL,kK".split(","),p:"oO,0),-_,[{,;:,lL".split(","),q:[null,"1!","2@","wW","aA",null],r:"eE,4$,5%,tT,fF,dD".split(","),s:"aA,wW,eE,dD,xX,zZ".split(","),t:"rR,5%,6^,yY,gG,fF".split(","),u:"yY,7&,8*,iI,jJ,hH".split(","),v:["cC","fF","gG","bB",null,null],w:"qQ,2@,3#,eE,sS,aA".split(","),x:["zZ","sS","dD","cC",null,null],y:"tT,6^,7&,uU,hH,gG".split(","),z:[null,"aA","sS","xX",null,null],"{":"pP,-_,=+,]},'\",;:".split(","),"|":["]}",null,null,
            null,null,null],"}":["[{","=+",null,"\\|",null,"'\""],"~":[null,null,null,"1!",null,null]},F={"*":["/",null,null,null,"-","+","9","8"],"+":["9","*","-",null,null,null,null,"6"],"-":["*",null,null,null,null,null,"+","9"],".":["0","2","3",null,null,null,null,null],"/":[null,null,null,null,"*","9","8","7"],"0":[null,"1","2","3",".",null,null,null],1:[null,null,"4","5","2","0",null,null],2:["1","4","5","6","3",".","0",null],3:["2","5","6",null,null,null,".","0"],4:[null,null,"7","8","5","2","1",null],
        5:"4,7,8,9,6,3,2,1".split(","),6:["5","8","9","+",null,null,"3","2"],7:[null,null,null,"/","8","5","4",null],8:["7",null,"/","*","9","6","5","4"],9:["8","/","*","-","+",null,"6","5"]},v,G,oa,na,qa,pa,ra,t,w,H;v=[r("passwords",q("password,123456,12345678,1234,qwerty,12345,dragon,pussy,baseball,football,letmein,monkey,696969,abc123,mustang,shadow,master,111111,2000,jordan,superman,harley,1234567,fuckme,hunter,fuckyou,trustno1,ranger,buster,tigger,soccer,fuck,batman,test,pass,killer,hockey,charlie,love,sunshine,asshole,6969,pepper,access,123456789,654321,maggie,starwars,silver,dallas,yankees,123123,666666,hello,orange,biteme,freedom,computer,sexy,thunder,ginger,hammer,summer,corvette,fucker,austin,1111,merlin,121212,golfer,cheese,princess,chelsea,diamond,yellow,bigdog,secret,asdfgh,sparky,cowboy,camaro,matrix,falcon,iloveyou,guitar,purple,scooter,phoenix,aaaaaa,tigers,porsche,mickey,maverick,cookie,nascar,peanut,131313,money,horny,samantha,panties,steelers,snoopy,boomer,whatever,iceman,smokey,gateway,dakota,cowboys,eagles,chicken,dick,black,zxcvbn,ferrari,knight,hardcore,compaq,coffee,booboo,bitch,bulldog,xxxxxx,welcome,player,ncc1701,wizard,scooby,junior,internet,bigdick,brandy,tennis,blowjob,banana,monster,spider,lakers,rabbit,enter,mercedes,fender,yamaha,diablo,boston,tiger,marine,chicago,rangers,gandalf,winter,bigtits,barney,raiders,porn,badboy,blowme,spanky,bigdaddy,chester,london,midnight,blue,fishing,000000,hannah,slayer,11111111,sexsex,redsox,thx1138,asdf,marlboro,panther,zxcvbnm,arsenal,qazwsx,mother,7777777,jasper,winner,golden,butthead,viking,iwantu,angels,prince,cameron,girls,madison,hooters,startrek,captain,maddog,jasmine,butter,booger,golf,rocket,theman,liverpoo,flower,forever,muffin,turtle,sophie,redskins,toyota,sierra,winston,giants,packers,newyork,casper,bubba,112233,lovers,mountain,united,driver,helpme,fucking,pookie,lucky,maxwell,8675309,bear,suckit,gators,5150,222222,shithead,fuckoff,jaguar,hotdog,tits,gemini,lover,xxxxxxxx,777777,canada,florida,88888888,rosebud,metallic,doctor,trouble,success,stupid,tomcat,warrior,peaches,apples,fish,qwertyui,magic,buddy,dolphins,rainbow,gunner,987654,freddy,alexis,braves,cock,2112,1212,cocacola,xavier,dolphin,testing,bond007,member,voodoo,7777,samson,apollo,fire,tester,beavis,voyager,porno,rush2112,beer,apple,scorpio,skippy,sydney,red123,power,beaver,star,jackass,flyers,boobs,232323,zzzzzz,scorpion,doggie,legend,ou812,yankee,blazer,runner,birdie,bitches,555555,topgun,asdfasdf,heaven,viper,animal,2222,bigboy,4444,private,godzilla,lifehack,phantom,rock,august,sammy,cool,platinum,jake,bronco,heka6w2,copper,cumshot,garfield,willow,cunt,slut,69696969,kitten,super,jordan23,eagle1,shelby,america,11111,free,123321,chevy,bullshit,broncos,horney,surfer,nissan,999999,saturn,airborne,elephant,shit,action,adidas,qwert,1313,explorer,police,christin,december,wolf,sweet,therock,online,dickhead,brooklyn,cricket,racing,penis,0000,teens,redwings,dreams,michigan,hentai,magnum,87654321,donkey,trinity,digital,333333,cartman,guinness,123abc,speedy,buffalo,kitty,pimpin,eagle,einstein,nirvana,vampire,xxxx,playboy,pumpkin,snowball,test123,sucker,mexico,beatles,fantasy,celtic,cherry,cassie,888888,sniper,genesis,hotrod,reddog,alexande,college,jester,passw0rd,bigcock,lasvegas,slipknot,3333,death,1q2w3e,eclipse,1q2w3e4r,drummer,montana,music,aaaa,carolina,colorado,creative,hello1,goober,friday,bollocks,scotty,abcdef,bubbles,hawaii,fluffy,horses,thumper,5555,pussies,darkness,asdfghjk,boobies,buddha,sandman,naughty,honda,azerty,6666,shorty,money1,beach,loveme,4321,simple,poohbear,444444,badass,destiny,vikings,lizard,assman,nintendo,123qwe,november,xxxxx,october,leather,bastard,101010,extreme,password1,pussy1,lacrosse,hotmail,spooky,amateur,alaska,badger,paradise,maryjane,poop,mozart,video,vagina,spitfire,cherokee,cougar,420420,horse,enigma,raider,brazil,blonde,55555,dude,drowssap,lovely,1qaz2wsx,booty,snickers,nipples,diesel,rocks,eminem,westside,suzuki,passion,hummer,ladies,alpha,suckme,147147,pirate,semperfi,jupiter,redrum,freeuser,wanker,stinky,ducati,paris,babygirl,windows,spirit,pantera,monday,patches,brutus,smooth,penguin,marley,forest,cream,212121,flash,maximus,nipple,vision,pokemon,champion,fireman,indian,softball,picard,system,cobra,enjoy,lucky1,boogie,marines,security,dirty,admin,wildcats,pimp,dancer,hardon,fucked,abcd1234,abcdefg,ironman,wolverin,freepass,bigred,squirt,justice,hobbes,pearljam,mercury,domino,9999,rascal,hitman,mistress,bbbbbb,peekaboo,naked,budlight,electric,sluts,stargate,saints,bondage,bigman,zombie,swimming,duke,qwerty1,babes,scotland,disney,rooster,mookie,swordfis,hunting,blink182,8888,samsung,bubba1,whore,general,passport,aaaaaaaa,erotic,liberty,arizona,abcd,newport,skipper,rolltide,balls,happy1,galore,christ,weasel,242424,wombat,digger,classic,bulldogs,poopoo,accord,popcorn,turkey,bunny,mouse,007007,titanic,liverpool,dreamer,everton,chevelle,psycho,nemesis,pontiac,connor,eatme,lickme,cumming,ireland,spiderma,patriots,goblue,devils,empire,asdfg,cardinal,shaggy,froggy,qwer,kawasaki,kodiak,phpbb,54321,chopper,hooker,whynot,lesbian,snake,teen,ncc1701d,qqqqqq,airplane,britney,avalon,sugar,sublime,wildcat,raven,scarface,elizabet,123654,trucks,wolfpack,pervert,redhead,american,bambam,woody,shaved,snowman,tiger1,chicks,raptor,1969,stingray,shooter,france,stars,madmax,sports,789456,simpsons,lights,chronic,hahaha,packard,hendrix,service,spring,srinivas,spike,252525,bigmac,suck,single,popeye,tattoo,texas,bullet,taurus,sailor,wolves,panthers,japan,strike,pussycat,chris1,loverboy,berlin,sticky,tarheels,russia,wolfgang,testtest,mature,catch22,juice,michael1,nigger,159753,alpha1,trooper,hawkeye,freaky,dodgers,pakistan,machine,pyramid,vegeta,katana,moose,tinker,coyote,infinity,pepsi,letmein1,bang,hercules,james1,tickle,outlaw,browns,billybob,pickle,test1,sucks,pavilion,changeme,caesar,prelude,darkside,bowling,wutang,sunset,alabama,danger,zeppelin,pppppp,2001,ping,darkstar,madonna,qwe123,bigone,casino,charlie1,mmmmmm,integra,wrangler,apache,tweety,qwerty12,bobafett,transam,2323,seattle,ssssss,openup,pandora,pussys,trucker,indigo,storm,malibu,weed,review,babydoll,doggy,dilbert,pegasus,joker,catfish,flipper,fuckit,detroit,cheyenne,bruins,smoke,marino,fetish,xfiles,stinger,pizza,babe,stealth,manutd,gundam,cessna,longhorn,presario,mnbvcxz,wicked,mustang1,victory,21122112,awesome,athena,q1w2e3r4,holiday,knicks,redneck,12341234,gizmo,scully,dragon1,devildog,triumph,bluebird,shotgun,peewee,angel1,metallica,madman,impala,lennon,omega,access14,enterpri,search,smitty,blizzard,unicorn,tight,asdf1234,trigger,truck,beauty,thailand,1234567890,cadillac,castle,bobcat,buddy1,sunny,stones,asian,butt,loveyou,hellfire,hotsex,indiana,panzer,lonewolf,trumpet,colors,blaster,12121212,fireball,precious,jungle,atlanta,gold,corona,polaris,timber,theone,baller,chipper,skyline,dragons,dogs,licker,engineer,kong,pencil,basketba,hornet,barbie,wetpussy,indians,redman,foobar,travel,morpheus,target,141414,hotstuff,photos,rocky1,fuck_inside,dollar,turbo,design,hottie,202020,blondes,4128,lestat,avatar,goforit,random,abgrtyu,jjjjjj,cancer,q1w2e3,smiley,express,virgin,zipper,wrinkle1,babylon,consumer,monkey1,serenity,samurai,99999999,bigboobs,skeeter,joejoe,master1,aaaaa,chocolat,christia,stephani,tang,1234qwer,98765432,sexual,maxima,77777777,buckeye,highland,seminole,reaper,bassman,nugget,lucifer,airforce,nasty,warlock,2121,dodge,chrissy,burger,snatch,pink,gang,maddie,huskers,piglet,photo,dodger,paladin,chubby,buckeyes,hamlet,abcdefgh,bigfoot,sunday,manson,goldfish,garden,deftones,icecream,blondie,spartan,charger,stormy,juventus,galaxy,escort,zxcvb,planet,blues,david1,ncc1701e,1966,51505150,cavalier,gambit,ripper,oicu812,nylons,aardvark,whiskey,bing,plastic,anal,babylon5,loser,racecar,insane,yankees1,mememe,hansolo,chiefs,fredfred,freak,frog,salmon,concrete,zxcv,shamrock,atlantis,wordpass,rommel,1010,predator,massive,cats,sammy1,mister,stud,marathon,rubber,ding,trunks,desire,montreal,justme,faster,irish,1999,jessica1,alpine,diamonds,00000,swinger,shan,stallion,pitbull,letmein2,ming,shadow1,clitoris,fuckers,jackoff,bluesky,sundance,renegade,hollywoo,151515,wolfman,soldier,ling,goddess,manager,sweety,titans,fang,ficken,niners,bubble,hello123,ibanez,sweetpea,stocking,323232,tornado,content,aragorn,trojan,christop,rockstar,geronimo,pascal,crimson,google,fatcat,lovelove,cunts,stimpy,finger,wheels,viper1,latin,greenday,987654321,creampie,hiphop,snapper,funtime,duck,trombone,adult,cookies,mulder,westham,latino,jeep,ravens,drizzt,madness,energy,kinky,314159,slick,rocker,55555555,mongoose,speed,dddddd,catdog,cheng,ghost,gogogo,tottenha,curious,butterfl,mission,january,shark,techno,lancer,lalala,chichi,orion,trixie,delta,bobbob,bomber,kang,1968,spunky,liquid,beagle,granny,network,kkkkkk,1973,biggie,beetle,teacher,toronto,anakin,genius,cocks,dang,karate,snakes,bangkok,fuckyou2,pacific,daytona,infantry,skywalke,sailing,raistlin,vanhalen,huang,blackie,tarzan,strider,sherlock,gong,dietcoke,ultimate,shai,sprite,ting,artist,chai,chao,devil,python,ninja,ytrewq,superfly,456789,tian,jing,jesus1,freedom1,drpepper,chou,hobbit,shen,nolimit,mylove,biscuit,yahoo,shasta,sex4me,smoker,pebbles,pics,philly,tong,tintin,lesbians,cactus,frank1,tttttt,chun,danni,emerald,showme,pirates,lian,dogg,xiao,xian,tazman,tanker,toshiba,gotcha,rang,keng,jazz,bigguy,yuan,tomtom,chaos,fossil,racerx,creamy,bobo,musicman,warcraft,blade,shuang,shun,lick,jian,microsoft,rong,feng,getsome,quality,1977,beng,wwwwww,yoyoyo,zhang,seng,harder,qazxsw,qian,cong,chuan,deng,nang,boeing,keeper,western,1963,subaru,sheng,thuglife,teng,jiong,miao,mang,maniac,pussie,a1b2c3,zhou,zhuang,xing,stonecol,spyder,liang,jiang,memphis,ceng,magic1,logitech,chuang,sesame,shao,poison,titty,kuan,kuai,mian,guan,hamster,guai,ferret,geng,duan,pang,maiden,quan,velvet,nong,neng,nookie,buttons,bian,bingo,biao,zhong,zeng,zhun,ying,zong,xuan,zang,0.0.000,suan,shei,shui,sharks,shang,shua,peng,pian,piao,liao,meng,miami,reng,guang,cang,ruan,diao,luan,qing,chui,chuo,cuan,nuan,ning,heng,huan,kansas,muscle,weng,1passwor,bluemoon,zhui,zhua,xiang,zheng,zhen,zhei,zhao,zhan,yomama,zhai,zhuo,zuan,tarheel,shou,shuo,tiao,leng,kuang,jiao,13579,basket,qiao,qiong,qiang,chuai,nian,niao,niang,huai,22222222,zhuan,zhuai,shuan,shuai,stardust,jumper,66666666,charlott,qwertz,bones,waterloo,2002,11223344,oldman,trains,vertigo,246810,black1,swallow,smiles,standard,alexandr,parrot,user,1976,surfing,pioneer,apple1,asdasd,auburn,hannibal,frontier,panama,welcome1,vette,blue22,shemale,111222,baggins,groovy,global,181818,1979,blades,spanking,byteme,lobster,dawg,japanese,1970,1964,2424,polo,coco,deedee,mikey,1972,171717,1701,strip,jersey,green1,capital,putter,vader,seven7,banshee,grendel,dicks,hidden,iloveu,1980,ledzep,147258,female,bugger,buffett,molson,2020,wookie,sprint,jericho,102030,ranger1,trebor,deepthroat,bonehead,molly1,mirage,models,1984,2468,showtime,squirrel,pentium,anime,gator,powder,twister,connect,neptune,engine,eatshit,mustangs,woody1,shogun,septembe,pooh,jimbo,russian,sabine,voyeur,2525,363636,camel,germany,giant,qqqq,nudist,bone,sleepy,tequila,fighter,obiwan,makaveli,vacation,walnut,1974,ladybug,cantona,ccbill,satan,rusty1,passwor1,columbia,kissme,motorola,william1,1967,zzzz,skater,smut,matthew1,valley,coolio,dagger,boner,bull,horndog,jason1,penguins,rescue,griffey,8j4ye3uz,californ,champs,qwertyuiop,portland,colt45,xxxxxxx,xanadu,tacoma,carpet,gggggg,safety,palace,italia,picturs,picasso,thongs,tempest,asd123,hairy,foxtrot,nimrod,hotboy,343434,1111111,asdfghjkl,goose,overlord,stranger,454545,shaolin,sooners,socrates,spiderman,peanuts,13131313,andrew1,filthy,ohyeah,africa,intrepid,pickles,assass,fright,potato,hhhhhh,kingdom,weezer,424242,pepsi1,throat,looker,puppy,butch,sweets,megadeth,analsex,nymets,ddddddd,bigballs,oakland,oooooo,qweasd,chucky,carrot,chargers,discover,dookie,condor,horny1,sunrise,sinner,jojo,megapass,martini,assfuck,ffffff,mushroom,jamaica,7654321,77777,cccccc,gizmodo,tractor,mypass,hongkong,1975,blue123,pissing,thomas1,redred,basketball,satan666,dublin,bollox,kingkong,1971,22222,272727,sexx,bbbb,grizzly,passat,defiant,bowler,knickers,monitor,wisdom,slappy,thor,letsgo,robert1,brownie,098765,playtime,lightnin,atomic,goku,llllll,qwaszx,cosmos,bosco,knights,beast,slapshot,assword,frosty,dumbass,mallard,dddd,159357,titleist,aussie,golfing,doobie,loveit,werewolf,vipers,1965,blabla,surf,sucking,tardis,thegame,legion,rebels,sarah1,onelove,loulou,toto,blackcat,0007,tacobell,soccer1,jedi,method,poopie,boob,breast,kittycat,belly,pikachu,thunder1,thankyou,celtics,frogger,scoobydo,sabbath,coltrane,budman,jackal,zzzzz,licking,gopher,geheim,lonestar,primus,pooper,newpass,brasil,heather1,husker,element,moomoo,beefcake,zzzzzzzz,shitty,smokin,jjjj,anthony1,anubis,backup,gorilla,fuckface,lowrider,punkrock,traffic,delta1,amazon,fatass,dodgeram,dingdong,qqqqqqqq,breasts,boots,honda1,spidey,poker,temp,johnjohn,147852,asshole1,dogdog,tricky,crusader,syracuse,spankme,speaker,meridian,amadeus,harley1,falcons,turkey50,kenwood,keyboard,ilovesex,1978,shazam,shalom,lickit,jimbob,roller,fatman,sandiego,magnus,cooldude,clover,mobile,plumber,texas1,tool,topper,mariners,rebel,caliente,celica,oxford,osiris,orgasm,punkin,porsche9,tuesday,breeze,bossman,kangaroo,latinas,astros,scruffy,qwertyu,hearts,jammer,java,1122,goodtime,chelsea1,freckles,flyboy,doodle,nebraska,bootie,kicker,webmaster,vulcan,191919,blueeyes,321321,farside,rugby,director,pussy69,power1,hershey,hermes,monopoly,birdman,blessed,blackjac,southern,peterpan,thumbs,fuckyou1,rrrrrr,a1b2c3d4,coke,bohica,elvis1,blacky,sentinel,snake1,richard1,1234abcd,guardian,candyman,fisting,scarlet,dildo,pancho,mandingo,lucky7,condom,munchkin,billyboy,summer1,sword,skiing,site,sony,thong,rootbeer,assassin,fffff,fitness,durango,postal,achilles,kisses,warriors,plymouth,topdog,asterix,hallo,cameltoe,fuckfuck,eeeeee,sithlord,theking,avenger,backdoor,chevrole,trance,cosworth,houses,homers,eternity,kingpin,verbatim,incubus,1961,blond,zaphod,shiloh,spurs,mighty,aliens,charly,dogman,omega1,printer,aggies,deadhead,bitch1,stone55,pineappl,thekid,rockets,camels,formula,oracle,pussey,porkchop,abcde,clancy,mystic,inferno,blackdog,steve1,alfa,grumpy,flames,puffy,proxy,valhalla,unreal,herbie,engage,yyyyyy,010101,pistol,celeb,gggg,portugal,a12345,newbie,mmmm,1qazxsw2,zorro,writer,stripper,sebastia,spread,links,metal,1221,565656,funfun,trojans,cyber,hurrican,moneys,1x2zkg8w,zeus,tomato,lion,atlantic,usa123,trans,aaaaaaa,homerun,hyperion,kevin1,blacks,44444444,skittles,fart,gangbang,fubar,sailboat,oilers,buster1,hithere,immortal,sticks,pilot,lexmark,jerkoff,maryland,cheers,possum,cutter,muppet,swordfish,sport,sonic,peter1,jethro,rockon,asdfghj,pass123,pornos,ncc1701a,bootys,buttman,bonjour,1960,bears,362436,spartans,tinman,threesom,maxmax,1414,bbbbb,camelot,chewie,gogo,fusion,saint,dilligaf,nopass,hustler,hunter1,whitey,beast1,yesyes,spank,smudge,pinkfloy,patriot,lespaul,hammers,formula1,sausage,scooter1,orioles,oscar1,colombia,cramps,exotic,iguana,suckers,slave,topcat,lancelot,magelan,racer,crunch,british,steph,456123,skinny,seeking,rockhard,filter,freaks,sakura,pacman,poontang,newlife,homer1,klingon,watcher,walleye,tasty,sinatra,starship,steel,starbuck,poncho,amber1,gonzo,catherin,candle,firefly,goblin,scotch,diver,usmc,huskies,kentucky,kitkat,beckham,bicycle,yourmom,studio,33333333,splash,jimmy1,12344321,sapphire,mailman,raiders1,ddddd,excalibu,illini,imperial,lansing,maxx,gothic,golfball,facial,front242,macdaddy,qwer1234,vectra,cowboys1,crazy1,dannyboy,aquarius,franky,ffff,sassy,pppp,pppppppp,prodigy,noodle,eatpussy,vortex,wanking,billy1,siemens,phillies,groups,chevy1,cccc,gggggggg,doughboy,dracula,nurses,loco,lollipop,utopia,chrono,cooler,nevada,wibble,summit,1225,capone,fugazi,panda,qazwsxed,puppies,triton,9876,nnnnnn,momoney,iforgot,wolfie,studly,hamburg,81fukkc,741852,catman,china,gagging,scott1,oregon,qweqwe,crazybab,daniel1,cutlass,holes,mothers,music1,walrus,1957,bigtime,xtreme,simba,ssss,rookie,bathing,rotten,maestro,turbo1,99999,butthole,hhhh,yoda,shania,phish,thecat,rightnow,baddog,greatone,gateway1,abstr,napster,brian1,bogart,hitler,wildfire,jackson1,1981,beaner,yoyo,0.0.0.000,super1,select,snuggles,slutty,phoenix1,technics,toon,raven1,rayray,123789,1066,albion,greens,gesperrt,brucelee,hehehe,kelly1,mojo,1998,bikini,woofwoof,yyyy,strap,sites,central,f**k,nyjets,punisher,username,vanilla,twisted,bunghole,viagra,veritas,pony,titts,labtec,jenny1,masterbate,mayhem,redbull,govols,gremlin,505050,gmoney,rovers,diamond1,trident,abnormal,deskjet,cuddles,bristol,milano,vh5150,jarhead,1982,bigbird,bizkit,sixers,slider,star69,starfish,penetration,tommy1,john316,caligula,flicks,films,railroad,cosmo,cthulhu,br0d3r,bearbear,swedish,spawn,patrick1,reds,anarchy,groove,fuckher,oooo,airbus,cobra1,clips,delete,duster,kitty1,mouse1,monkeys,jazzman,1919,262626,swinging,stroke,stocks,sting,pippen,labrador,jordan1,justdoit,meatball,females,vector,cooter,defender,nike,bubbas,bonkers,kahuna,wildman,4121,sirius,static,piercing,terror,teenage,leelee,microsof,mechanic,robotech,rated,chaser,salsero,macross,quantum,tsunami,daddy1,cruise,newpass6,nudes,hellyeah,1959,zaq12wsx,striker,spice,spectrum,smegma,thumb,jjjjjjjj,mellow,cancun,cartoon,sabres,samiam,oranges,oklahoma,lust,denali,nude,noodles,brest,hooter,mmmmmmmm,warthog,blueblue,zappa,wolverine,sniffing,jjjjj,calico,freee,rover,pooter,closeup,bonsai,emily1,keystone,iiii,1955,yzerman,theboss,tolkien,megaman,rasta,bbbbbbbb,hal9000,goofy,gringo,gofish,gizmo1,samsam,scuba,onlyme,tttttttt,corrado,clown,clapton,bulls,jayhawk,wwww,sharky,seeker,ssssssss,pillow,thesims,lighter,lkjhgf,melissa1,marcius2,guiness,gymnast,casey1,goalie,godsmack,lolo,rangers1,poppy,clemson,clipper,deeznuts,holly1,eeee,kingston,yosemite,sucked,sex123,sexy69,pic\\'s,tommyboy,masterbating,gretzky,happyday,frisco,orchid,orange1,manchest,aberdeen,ne1469,boxing,korn,intercourse,161616,1985,ziggy,supersta,stoney,amature,babyboy,bcfields,goliath,hack,hardrock,frodo,scout,scrappy,qazqaz,tracker,active,craving,commando,cohiba,cyclone,bubba69,katie1,mpegs,vsegda,irish1,sexy1,smelly,squerting,lions,jokers,jojojo,meathead,ashley1,groucho,cheetah,champ,firefox,gandalf1,packer,love69,tyler1,typhoon,tundra,bobby1,kenworth,village,volley,wolf359,0420,000007,swimmer,skydive,smokes,peugeot,pompey,legolas,redhot,rodman,redalert,grapes,4runner,carrera,floppy,ou8122,quattro,cloud9,davids,nofear,busty,homemade,mmmmm,whisper,vermont,webmaste,wives,insertion,jayjay,philips,topher,temptress,midget,ripken,havefun,canon,celebrity,ghetto,ragnarok,usnavy,conover,cruiser,dalshe,nicole1,buzzard,hottest,kingfish,misfit,milfnew,warlord,wassup,bigsexy,blackhaw,zippy,tights,kungfu,labia,meatloaf,area51,batman1,bananas,636363,ggggg,paradox,queens,adults,aikido,cigars,hoosier,eeyore,moose1,warez,interacial,streaming,313131,pertinant,pool6123,mayday,animated,banker,baddest,gordon24,ccccc,fantasies,aisan,deadman,homepage,ejaculation,whocares,iscool,jamesbon,1956,1pussy,womam,sweden,skidoo,spock,sssss,pepper1,pinhead,micron,allsop,amsterda,gunnar,666999,february,fletch,george1,sapper,sasha1,luckydog,lover1,magick,popopo,ultima,cypress,businessbabe,brandon1,vulva,vvvv,jabroni,bigbear,yummy,010203,searay,secret1,sinbad,sexxxx,soleil,software,piccolo,thirteen,leopard,legacy,memorex,redwing,rasputin,134679,anfield,greenbay,catcat,feather,scanner,pa55word,contortionist,danzig,daisy1,hores,exodus,iiiiii,1001,subway,snapple,sneakers,sonyfuck,picks,poodle,test1234,llll,junebug,marker,mellon,ronaldo,roadkill,amanda1,asdfjkl,beaches,great1,cheerleaers,doitnow,ozzy,boxster,brighton,housewifes,kkkk,mnbvcx,moocow,vides,1717,bigmoney,blonds,1000,storys,stereo,4545,420247,seductive,sexygirl,lesbean,justin1,124578,cabbage,canadian,gangbanged,dodge1,dimas,malaka,puss,probes,coolman,nacked,hotpussy,erotica,kool,implants,intruder,bigass,zenith,woohoo,womans,tango,pisces,laguna,maxell,andyod22,barcelon,chainsaw,chickens,flash1,orgasms,magicman,profit,pusyy,pothead,coconut,chuckie,clevelan,builder,budweise,hotshot,horizon,experienced,mondeo,wifes,1962,stumpy,smiths,slacker,pitchers,passwords,laptop,allmine,alliance,bbbbbbb,asscock,halflife,88888,chacha,saratoga,sandy1,doogie,qwert40,transexual,close-up,ib6ub9,volvo,jacob1,iiiii,beastie,sunnyday,stoned,sonics,starfire,snapon,pictuers,pepe,testing1,tiberius,lisalisa,lesbain,litle,retard,ripple,austin1,badgirl,golfgolf,flounder,royals,dragoon,dickie,passwor,majestic,poppop,trailers,nokia,bobobo,br549,minime,mikemike,whitesox,1954,3232,353535,seamus,solo,sluttey,pictere,titten,lback,1024,goodluck,fingerig,gallaries,goat,passme,oasis,lockerroom,logan1,rainman,treasure,custom,cyclops,nipper,bucket,homepage-,hhhhh,momsuck,indain,2345,beerbeer,bimmer,stunner,456456,tootsie,testerer,reefer,1012,harcore,gollum,545454,chico,caveman,fordf150,fishes,gaymen,saleen,doodoo,pa55w0rd,presto,qqqqq,cigar,bogey,helloo,dutch,kamikaze,wasser,vietnam,visa,japanees,0123,swords,slapper,peach,masterbaiting,redwood,1005,ametuer,chiks,fucing,sadie1,panasoni,mamas,rambo,unknown,absolut,dallas1,housewife,keywest,kipper,18436572,1515,zxczxc,303030,shaman,terrapin,masturbation,mick,redfish,1492,angus,goirish,hardcock,forfun,galary,freeporn,duchess,olivier,lotus,pornographic,ramses,purdue,traveler,crave,brando,enter1,killme,moneyman,welder,windsor,wifey,indon,yyyyy,taylor1,4417,picher,pickup,thumbnils,johnboy,jets,ameteur,amateurs,apollo13,hambone,goldwing,5050,sally1,doghouse,padres,pounding,quest,truelove,underdog,trader,climber,bolitas,hohoho,beanie,beretta,wrestlin,stroker,sexyman,jewels,johannes,mets,rhino,bdsm,balloons,grils,happy123,flamingo,route66,devo,outkast,paintbal,magpie,llllllll,twilight,critter,cupcake,nickel,bullseye,knickerless,videoes,binladen,xerxes,slim,slinky,pinky,thanatos,meister,menace,retired,albatros,balloon,goten,5551212,getsdown,donuts,nwo4life,tttt,comet,deer,dddddddd,deeznutz,nasty1,nonono,enterprise,eeeee,misfit99,milkman,vvvvvv,1818,blueboy,bigbutt,tech,toolman,juggalo,jetski,barefoot,50spanks,gobears,scandinavian,cubbies,nitram,kings,bilbo,yumyum,zzzzzzz,stylus,321654,shannon1,server,squash,starman,steeler,phrases,techniques,laser,135790,athens,cbr600,chemical,fester,gangsta,fucku2,droopy,objects,passwd,lllll,manchester,vedder,clit,chunky,darkman,buckshot,buddah,boobed,henti,winter1,bigmike,beta,zidane,talon,slave1,pissoff,thegreat,lexus,matador,readers,armani,goldstar,5656,fmale,fuking,fucku,ggggggg,sauron,diggler,pacers,looser,pounded,premier,triangle,cosmic,depeche,norway,helmet,mustard,misty1,jagger,3x7pxr,silver1,snowboar,penetrating,photoes,lesbens,lindros,roadking,rockford,1357,143143,asasas,goodboy,898989,chicago1,ferrari1,galeries,godfathe,gawker,gargoyle,gangster,rubble,rrrr,onetime,pussyman,pooppoop,trapper,cinder,newcastl,boricua,bunny1,boxer,hotred,hockey1,edward1,moscow,mortgage,bigtit,snoopdog,joshua1,july,1230,assholes,frisky,sanity,divine,dharma,lucky13,akira,butterfly,hotbox,hootie,howdy,earthlink,kiteboy,westwood,1988,blackbir,biggles,wrench,wrestle,slippery,pheonix,penny1,pianoman,thedude,jenn,jonjon,jones1,roadrunn,arrow,azzer,seahawks,diehard,dotcom,tunafish,chivas,cinnamon,clouds,deluxe,northern,boobie,momomo,modles,volume,23232323,bluedog,wwwwwww,zerocool,yousuck,pluto,limewire,joung,awnyce,gonavy,haha,films+pic+galeries,girsl,fuckthis,girfriend,uncencored,a123456,chrisbln,combat,cygnus,cupoi,netscape,hhhhhhhh,eagles1,elite,knockers,1958,tazmania,shonuf,pharmacy,thedog,midway,arsenal1,anaconda,australi,gromit,gotohell,787878,66666,carmex2,camber,gator1,ginger1,fuzzy,seadoo,lovesex,rancid,uuuuuu,911911,bulldog1,heater,monalisa,mmmmmmm,whiteout,virtual,jamie1,japanes,james007,2727,2469,blam,bitchass,zephyr,stiffy,sweet1,southpar,spectre,tigger1,tekken,lakota,lionking,jjjjjjj,megatron,1369,hawaiian,gymnastic,golfer1,gunners,7779311,515151,sanfran,optimus,panther1,love1,maggie1,pudding,aaron1,delphi,niceass,bounce,house1,killer1,momo,musashi,jammin,2003,234567,wp2003wp,submit,sssssss,spikes,sleeper,passwort,kume,meme,medusa,mantis,reebok,1017,artemis,harry1,cafc91,fettish,oceans,oooooooo,mango,ppppp,trainer,uuuu,909090,death1,bullfrog,hokies,holyshit,eeeeeee,jasmine1,&amp,&amp;,spinner,jockey,babyblue,gooner,474747,cheeks,pass1234,parola,okokok,poseidon,989898,crusher,cubswin,nnnn,kotaku,mittens,whatsup,vvvvv,iomega,insertions,bengals,biit,yellow1,012345,spike1,sowhat,pitures,pecker,theend,hayabusa,hawkeyes,florian,qaz123,usarmy,twinkle,chuckles,hounddog,hover,hothot,europa,kenshin,kojak,mikey1,water1,196969,wraith,zebra,wwwww,33333,simon1,spider1,snuffy,philippe,thunderb,teddy1,marino13,maria1,redline,renault,aloha,handyman,cerberus,gamecock,gobucks,freesex,duffman,ooooo,nuggets,magician,longbow,preacher,porno1,chrysler,contains,dalejr,navy,buffy1,hedgehog,hoosiers,honey1,hott,heyhey,dutchess,everest,wareagle,ihateyou,sunflowe,3434,senators,shag,spoon,sonoma,stalker,poochie,terminal,terefon,maradona,1007,142536,alibaba,america1,bartman,astro,goth,chicken1,cheater,ghost1,passpass,oral,r2d2c3po,civic,cicero,myxworld,kkkkk,missouri,wishbone,infiniti,1a2b3c,1qwerty,wonderboy,shojou,sparky1,smeghead,poiuy,titanium,lantern,jelly,1213,bayern,basset,gsxr750,cattle,fishing1,fullmoon,gilles,dima,obelix,popo,prissy,ramrod,bummer,hotone,dynasty,entry,konyor,missy1,282828,xyz123,426hemi,404040,seinfeld,pingpong,lazarus,marine1,12345a,beamer,babyface,greece,gustav,7007,ccccccc,faggot,foxy,gladiato,duckie,dogfood,packers1,longjohn,radical,tuna,clarinet,danny1,novell,bonbon,kashmir,kiki,mortimer,modelsne,moondog,vladimir,insert,1953,zxc123,supreme,3131,sexxx,softail,poipoi,pong,mars,martin1,rogue,avalanch,audia4,55bgates,cccccccc,came11,figaro,dogboy,dnsadm,dipshit,paradigm,othello,operator,tripod,chopin,coucou,cocksuck,borussia,heritage,hiziad,homerj,mullet,whisky,4242,speedo,starcraf,skylar,spaceman,piggy,tiger2,legos,jezebel,joker1,mazda,727272,chester1,rrrrrrrr,dundee,lumber,ppppppp,tranny,aaliyah,admiral,comics,delight,buttfuck,homeboy,eternal,kilroy,violin,wingman,walmart,bigblue,blaze,beemer,beowulf,bigfish,yyyyyyy,woodie,yeahbaby,0123456,tbone,syzygy,starter,linda1,merlot,mexican,11235813,banner,bangbang,badman,barfly,grease,charles1,ffffffff,doberman,dogshit,overkill,coolguy,claymore,demo,nomore,hhhhhhh,hondas,iamgod,enterme,electron,eastside,minimoni,mybaby,wildbill,wildcard,ipswich,200000,bearcat,zigzag,yyyyyyyy,sweetnes,369369,skyler,skywalker,pigeon,tipper,asdf123,alphabet,asdzxc,babybaby,banane,guyver,graphics,chinook,florida1,flexible,fuckinside,ursitesux,tototo,adam12,christma,chrome,buddie,bombers,hippie,misfits,292929,woofer,wwwwwwww,stubby,sheep,sparta,stang,spud,sporty,pinball,just4fun,maxxxx,rebecca1,fffffff,freeway,garion,rrrrr,sancho,outback,maggot,puddin,987456,hoops,mydick,19691969,bigcat,shiner,silverad,templar,lamer,juicy,mike1,maximum,1223,10101010,arrows,alucard,haggis,cheech,safari,dog123,orion1,paloma,qwerasdf,presiden,vegitto,969696,adonis,cookie1,newyork1,buddyboy,hellos,heineken,eraser,moritz,millwall,visual,jaybird,1983,beautifu,zodiac,steven1,sinister,slammer,smashing,slick1,sponge,teddybea,ticklish,jonny,1211,aptiva,applepie,bailey1,guitar1,canyon,gagged,fuckme1,digital1,dinosaur,98765,90210,clowns,cubs,deejay,nigga,naruto,boxcar,icehouse,hotties,electra,widget,1986,2004,bluefish,bingo1,*****,stratus,sultan,storm1,44444,4200,sentnece,sexyboy,sigma,smokie,spam,pippo,temppass,manman,1022,bacchus,aztnm,axio,bamboo,hakr,gregor,hahahaha,5678,camero1,dolphin1,paddle,magnet,qwert1,pyon,porsche1,tripper,noway,burrito,bozo,highheel,hookem,eddie1,entropy,kkkkkkkk,kkkkkkk,illinois,1945,1951,24680,21212121,100000,stonecold,taco,subzero,sexxxy,skolko,skyhawk,spurs1,sputnik,testpass,jiggaman,1224,hannah1,525252,4ever,carbon,scorpio1,rt6ytere,madison1,loki,coolness,coldbeer,citadel,monarch,morgan1,washingt,1997,bella1,yaya,superb,taxman,studman,3636,pizzas,tiffany1,lassie,larry1,joseph1,mephisto,reptile,razor,1013,hammer1,gypsy,grande,camper,chippy,cat123,chimera,fiesta,glock,domain,dieter,dragonba,onetwo,nygiants,password2,quartz,prowler,prophet,towers,ultra,cocker,corleone,dakota1,cumm,nnnnnnn,boxers,heynow,iceberg,kittykat,wasabi,vikings1,beerman,splinter,snoopy1,pipeline,mickey1,mermaid,micro,meowmeow,redbird,baura,chevys,caravan,frogman,diving,dogger,draven,drifter,oatmeal,paris1,longdong,quant4307s,rachel1,vegitta,cobras,corsair,dadada,mylife,bowwow,hotrats,eastwood,moonligh,modena,illusion,iiiiiii,jayhawks,swingers,shocker,shrimp,sexgod,squall,poiu,tigers1,toejam,tickler,julie1,jimbo1,jefferso,michael2,rodeo,robot,1023,annie1,bball,happy2,charter,flasher,falcon1,fiction,fastball,gadget,scrabble,diaper,dirtbike,oliver1,paco,macman,poopy,popper,postman,ttttttt,acura,cowboy1,conan,daewoo,nemrac58,nnnnn,nextel,bobdylan,eureka,kimmie,kcj9wx5n,killbill,musica,volkswag,wage,windmill,wert,vintage,iloveyou1,itsme,zippo,311311,starligh,smokey1,snappy,soulmate,plasma,krusty,just4me,marius,rebel1,1123,audi,fick,goaway,rusty2,dogbone,doofus,ooooooo,oblivion,mankind,mahler,lllllll,pumper,puck,pulsar,valkyrie,tupac,compass,concorde,cougars,delaware,niceguy,nocturne,bob123,boating,bronze,herewego,hewlett,houhou,earnhard,eeeeeeee,mingus,mobydick,venture,verizon,imation,1950,1948,1949,223344,bigbig,wowwow,sissy,spiker,snooker,sluggo,player1,jsbach,jumbo,medic,reddevil,reckless,123456a,1125,1031,astra,gumby,757575,585858,chillin,fuck1,radiohea,upyours,trek,coolcool,classics,choochoo,nikki1,nitro,boytoy,excite,kirsty,wingnut,wireless,icu812,1master,beatle,bigblock,wolfen,summer99,sugar1,tartar,sexysexy,senna,sexman,soprano,platypus,pixies,telephon,laura1,laurent,rimmer,1020,12qwaszx,hamish,halifax,fishhead,forum,dododo,doit,paramedi,lonesome,mandy1,uuuuu,uranus,ttttt,bruce1,helper,hopeful,eduard,dusty1,kathy1,moonbeam,muscles,monster1,monkeybo,windsurf,vvvvvvv,vivid,install,1947,187187,1941,1952,susan1,31415926,sinned,sexxy,smoothie,snowflak,playstat,playa,playboy1,toaster,jerry1,marie1,mason1,merlin1,roger1,roadster,112358,1121,andrea1,bacardi,hardware,789789,5555555,captain1,fergus,sascha,rrrrrrr,dome,onion,lololo,qqqqqqq,undertak,uuuuuuuu,uuuuuuu,cobain,cindy1,coors,descent,nimbus,nomad,nanook,norwich,bombay,broker,hookup,kiwi,winners,jackpot,1a2b3c4d,1776,beardog,bighead,bird33,0987,spooge,pelican,peepee,titan,thedoors,jeremy1,altima,baba,hardone,5454,catwoman,finance,farmboy,farscape,genesis1,salomon,loser1,r2d2,pumpkins,chriss,cumcum,ninjas,ninja1,killers,miller1,islander,jamesbond,intel,19841984,2626,bizzare,blue12,biker,yoyoma,sushi,shitface,spanker,steffi,sphinx,please1,paulie,pistons,tiburon,maxwell1,mdogg,rockies,armstron,alejandr,arctic,banger,audio,asimov,753951,4you,chilly,care1839,flyfish,fantasia,freefall,sandrine,oreo,ohshit,macbeth,madcat,loveya,qwerqwer,colnago,chocha,cobalt,crystal1,dabears,nevets,nineinch,broncos1,epsilon,kestrel,winston1,warrior1,iiiiiiii,iloveyou2,1616,woowoo,sloppy,specialk,tinkerbe,jellybea,reader,redsox1,1215,1112,arcadia,baggio,555666,cayman,cbr900rr,gabriell,glennwei,sausages,disco,pass1,lovebug,macmac,puffin,vanguard,trinitro,airwolf,aaa111,cocaine,cisco,datsun,bricks,bumper,eldorado,kidrock,wizard1,whiskers,wildwood,istheman,25802580,bigones,woodland,wolfpac,strawber,3030,sheba1,sixpack,peace1,physics,tigger2,toad,megan1,meow,ringo,amsterdam,717171,686868,5424,canuck,football1,footjob,fulham,seagull,orgy,lobo,mancity,vancouve,vauxhall,acidburn,derf,myspace1,boozer,buttercu,hola,minemine,munch,1dragon,biology,bestbuy,bigpoppa,blackout,blowfish,bmw325,bigbob,stream,talisman,tazz,sundevil,3333333,skate,shutup,shanghai,spencer1,slowhand,pinky1,tootie,thecrow,jubilee,jingle,matrix1,manowar,messiah,resident,redbaron,romans,andromed,athlon,beach1,badgers,guitars,harald,harddick,gotribe,6996,7grout,5wr2i7h8,635241,chase1,fallout,fiddle,fenris,francesc,fortuna,fairlane,felix1,gasman,fucks,sahara,sassy1,dogpound,dogbert,divx1,manila,pornporn,quasar,venom,987987,access1,clippers,daman,crusty,nathan1,nnnnnnnn,bruno1,budapest,kittens,kerouac,mother1,waldo1,whistler,whatwhat,wanderer,idontkno,1942,1946,bigdawg,bigpimp,zaqwsx,414141,3000gt,434343,serpent,smurf,pasword,thisisit,john1,robotics,redeye,rebelz,1011,alatam,asians,bama,banzai,harvest,575757,5329,fatty,fender1,flower2,funky,sambo,drummer1,dogcat,oedipus,osama,prozac,private1,rampage,concord,cinema,cornwall,cleaner,ciccio,clutch,corvet07,daemon,bruiser,boiler,hjkl,egghead,mordor,jamess,iverson3,bluesman,zouzou,090909,1002,stone1,4040,sexo,smith1,sperma,sneaky,polska,thewho,terminat,krypton,lekker,johnson1,johann,rockie,aspire,goodie,cheese1,fenway,fishon,fishin,fuckoff1,girls1,doomsday,pornking,ramones,rabbits,transit,aaaaa1,boyz,bookworm,bongo,bunnies,buceta,highbury,henry1,eastern,mischief,mopar,ministry,vienna,wildone,bigbooty,beavis1,xxxxxx1,yogibear,000001,0815,zulu,420000,sigmar,sprout,stalin,lkjhgfds,lagnaf,rolex,redfox,referee,123123123,1231,angus1,ballin,attila,greedy,grunt,747474,carpedie,caramel,foxylady,gatorade,futbol,frosch,saiyan,drums,donner,doggy1,drum,doudou,nutmeg,quebec,valdepen,tosser,tuscl,comein,cola,deadpool,bremen,hotass,hotmail1,eskimo,eggman,koko,kieran,katrin,kordell1,komodo,mone,munich,vvvvvvvv,jackson5,2222222,bergkamp,bigben,zanzibar,xxx123,sunny1,373737,slayer1,snoop,peachy,thecure,little1,jennaj,rasta69,1114,aries,havana,gratis,calgary,checkers,flanker,salope,dirty1,draco,dogface,luv2epus,rainbow6,qwerty123,umpire,turnip,vbnm,tucson,troll,codered,commande,neon,nico,nightwin,boomer1,bushido,hotmail0,enternow,keepout,karen1,mnbv,viewsoni,volcom,wizards,1995,berkeley,woodstoc,tarpon,shinobi,starstar,phat,toolbox,julien,johnny1,joebob,riders,reflex,120676,1235,angelus,anthrax,atlas,grandam,harlem,hawaii50,655321,cabron,challeng,callisto,firewall,firefire,flyer,flower1,gambler,frodo1,sam123,scania,dingo,papito,passmast,ou8123,randy1,twiggy,travis1,treetop,addict,admin1,963852,aceace,cirrus,bobdole,bonjovi,bootsy,boater,elway7,kenny1,moonshin,montag,wayne1,white1,jazzy,jakejake,1994,1991,2828,bluejays,belmont,sensei,southpark,peeper,pharao,pigpen,tomahawk,teensex,leedsutd,jeepster,jimjim,josephin,melons,matthias,robocop,1003,1027,antelope,azsxdc,gordo,hazard,granada,8989,7894,ceasar,cabernet,cheshire,chelle,candy1,fergie,fidelio,giorgio,fuckhead,dominion,qawsed,trucking,chloe1,daddyo,nostromo,boyboy,booster,bucky,honolulu,esquire,dynamite,mollydog,windows1,waffle,wealth,vincent1,jabber,jaguars,javelin,irishman,idefix,bigdog1,blue42,blanked,blue32,biteme1,bearcats,yessir,sylveste,sunfire,tbird,stryker,3ip76k2,sevens,pilgrim,tenchi,titman,leeds,lithium,linkin,marijuan,mariner,markie,midnite,reddwarf,1129,123asd,12312312,allstar,albany,asdf12,aspen,hardball,goldfing,7734,49ers,carnage,callum,carlos1,fitter,fandango,gofast,gamma,fucmy69,scrapper,dogwood,django,magneto,premium,9999999,abc1234,newyear,bookie,bounty,brown1,bologna,elway,killjoy,klondike,mouser,wayer,impreza,insomnia,24682468,2580,24242424,billbill,bellaco,blues1,blunts,teaser,sf49ers,shovel,solitude,spikey,pimpdadd,timeout,toffee,lefty,johndoe,johndeer,mega,manolo,ratman,robin1,1124,1210,1028,1226,babylove,barbados,gramma,646464,carpente,chaos1,fishbone,fireblad,frogs,screamer,scuba1,ducks,doggies,dicky,obsidian,rams,tottenham,aikman,comanche,corolla,cumslut,cyborg,boston1,houdini,helmut,elvisp,keksa12,monty1,wetter,watford,wiseguy,1989,1987,20202020,biatch,beezer,bigguns,blueball,bitchy,wyoming,yankees2,wrestler,stupid1,sealteam,sidekick,simple1,smackdow,sporting,spiral,smeller,plato,tophat,test2,toomuch,jello,junkie,maxim,maxime,meadow,remingto,roofer,124038,1018,1269,1227,123457,arkansas,aramis,beaker,barcelona,baltimor,googoo,goochi,852456,4711,catcher,champ1,fortress,fishfish,firefigh,geezer,rsalinas,samuel1,saigon,scooby1,dick1,doom,dontknow,magpies,manfred,vader1,universa,tulips,mygirl,bowtie,holycow,honeys,enforcer,waterboy,1992,23skidoo,bimbo,blue11,birddog,zildjian,030303,stinker,stoppedby,sexybabe,speakers,slugger,spotty,smoke1,polopolo,perfect1,torpedo,lakeside,jimmys,junior1,masamune,1214,april1,grinch,767676,5252,cherries,chipmunk,cezer121,carnival,capecod,finder,fearless,goats,funstuff,gideon,savior,seabee,sandro,schalke,salasana,disney1,duckman,pancake,pantera1,malice,love123,qwert123,tracer,creation,cwoui,nascar24,hookers,erection,ericsson,edthom,kokoko,kokomo,mooses,inter,1michael,1993,19781978,25252525,shibby,shamus,skibum,sheepdog,sex69,spliff,slipper,spoons,spanner,snowbird,toriamos,temp123,tennesse,lakers1,jomama,mazdarx7,recon,revolver,1025,1101,barney1,babycake,gotham,gravity,hallowee,616161,515000,caca,cannabis,chilli,fdsa,getout,fuck69,gators1,sable,rumble,dolemite,dork,duffer,dodgers1,onions,logger,lookout,magic32,poon,twat,coventry,citroen,civicsi,cocksucker,coochie,compaq1,nancy1,buzzer,boulder,butkus,bungle,hogtied,hotgirls,heidi1,eggplant,mustang6,monkey12,wapapapa,wendy1,volleyba,vibrate,blink,birthday4,xxxxx1,stephen1,suburban,sheeba,start1,soccer10,starcraft,soccer12,peanut1,plastics,penthous,peterbil,tetsuo,torino,tennis1,termite,lemmein,lakewood,jughead,melrose,megane,redone,angela1,goodgirl,gonzo1,golden1,gotyoass,656565,626262,capricor,chains,calvin1,getmoney,gabber,runaway,salami,dungeon,dudedude,opus,paragon,panhead,pasadena,opendoor,odyssey,magellan,printing,prince1,trustme,nono,buffet,hound,kajak,killkill,moto,winner1,vixen,whiteboy,versace,voyager1,indy,jackjack,bigal,beech,biggun,blake1,blue99,big1,synergy,success1,336699,sixty9,shark1,simba1,sebring,spongebo,spunk,springs,sliver,phialpha,password9,pizza1,pookey,tickling,lexingky,lawman,joe123,mike123,romeo1,redheads,apple123,backbone,aviation,green123,carlitos,byebye,cartman1,camden,chewy,camaross,favorite6,forumwp,ginscoot,fruity,sabrina1,devil666,doughnut,pantie,oldone,paintball,lumina,rainbow1,prosper,umbrella,ajax,951753,achtung,abc12345,compact,corndog,deerhunt,darklord,dank,nimitz,brandy1,hetfield,holein1,hillbill,hugetits,evolutio,kenobi,whiplash,wg8e3wjf,istanbul,invis,1996,bigjohn,bluebell,beater,benji,bluejay,xyzzy,suckdick,taichi,stellar,shaker,semper,splurge,squeak,pearls,playball,pooky,titfuck,joemama,johnny5,marcello,maxi,rhubarb,ratboy,reload,1029,1030,1220,bbking,baritone,gryphon,57chevy,494949,celeron,fishy,gladiator,fucker1,roswell,dougie,dicker,diva,donjuan,nympho,racers,truck1,trample,acer,cricket1,climax,denmark,cuervo,notnow,nittany,neutron,bosco1,buffa,breaker,hello2,hydro,kisskiss,kittys,montecar,modem,mississi,20012001,bigdick1,benfica,yahoo1,striper,tabasco,supra,383838,456654,seneca,shuttle,penguin1,pathfind,testibil,thethe,jeter2,marma,mark1,metoo,republic,rollin,redleg,redbone,redskin,1245,anthony7,altoids,barley,asswipe,bauhaus,bbbbbb1,gohome,harrier,golfpro,goldeney,818181,6666666,5000,5rxypn,cameron1,checker,calibra,freefree,faith1,fdm7ed,giraffe,giggles,fringe,scamper,rrpass1,screwyou,dimples,pacino,ontario,passthie,oberon,quest1,postov1000,puppydog,puffer,qwerty7,tribal,adam25,a1234567,collie,cleopatr,davide,namaste,buffalo1,bonovox,bukkake,burner,bordeaux,burly,hun999,enters,mohawk,vgirl,jayden,1812,1943,222333,bigjim,bigd,zoom,wordup,ziggy1,yahooo,workout,young1,xmas,zzzzzz1,surfer1,strife,sunlight,tasha1,skunk,sprinter,peaches1,pinetree,plum,pimping,theforce,thedon,toocool,laddie,lkjh,jupiter1,matty,redrose,1200,102938,antares,austin31,goose1,737373,78945612,789987,6464,calimero,caster,casper1,cement,chevrolet,chessie,caddy,canucks,fellatio,f00tball,gateway2,gamecube,rugby1,scheisse,dshade,dixie1,offshore,lucas1,macaroni,manga,pringles,puff,trouble1,ussy,coolhand,colonial,colt,darthvad,cygnusx1,natalie1,newark,hiking,errors,elcamino,koolaid,knight1,murphy1,volcano,idunno,2005,2233,blueberr,biguns,yamahar1,zapper,zorro1,0911,3006,sixsix,shopper,sextoy,snowboard,speedway,pokey,playboy2,titi,toonarmy,lambda,joecool,juniper,max123,mariposa,met2002,reggae,ricky1,1236,1228,1016,all4one,baberuth,asgard,484848,5683,6669,catnip,charisma,capslock,cashmone,galant,frenchy,gizmodo1,girlies,screwy,doubled,divers,dte4uw,dragonfl,treble,twinkie,tropical,crescent,cococo,dabomb,daffy,dandfa,cyrano,nathanie,boners,helium,hellas,espresso,killa,kikimora,w4g8at,ilikeit,iforget,1944,20002000,birthday1,beatles1,blue1,bigdicks,beethove,blacklab,blazers,benny1,woodwork,0069,0101,taffy,4567,shodan,pavlov,pinnacle,petunia,tito,teenie,lemonade,lalakers,lebowski,lalalala,ladyboy,jeeper,joyjoy,mercury1,mantle,mannn,rocknrol,riversid,123aaa,11112222,121314,1021,1004,1120,allen1,ambers,amstel,alice1,alleycat,allegro,ambrosia,gspot,goodsex,hattrick,harpoon,878787,8inches,4wwvte,cassandr,charlie123,gatsby,generic,gareth,fuckme2,samm,seadog,satchmo,scxakv,santafe,dipper,outoutout,madmad,london1,qbg26i,pussy123,tzpvaw,vamp,comp,cowgirl,coldplay,dawgs,nt5d27,novifarm,notredam,newness,mykids,bryan1,bouncer,hihihi,honeybee,iceman1,hotlips,dynamo,kappa,kahlua,muffy,mizzou,wannabe,wednesda,whatup,waterfal,willy1,bear1,billabon,youknow,yyyyyy1,zachary1,01234567,070462,zurich,superstar,stiletto,strat,427900,sigmachi,shells,sexy123,smile1,sophie1,stayout,somerset,playmate,pinkfloyd,phish1,payday,thebear,telefon,laetitia,kswbdu,jerky,metro,revoluti,1216,1201,1204,1222,1115,archange,barry1,handball,676767,chewbacc,furball,gocubs,fullback,gman,dewalt,dominiqu,diver1,dhip6a,olemiss,mandrake,mangos,pretzel,pusssy,tripleh,vagabond,clovis,dandan,csfbr5yy,deadspin,ninguna,ncc74656,bootsie,bp2002,bourbon,bumble,heyyou,houston1,hemlock,hippo,hornets,horseman,excess,extensa,muffin1,virginie,werdna,idontknow,jack1,1bitch,151nxjmt,bendover,bmwbmw,zaq123,wxcvbn,supernov,tahoe,shakur,sexyone,seviyi,smart1,speed1,pepito,phantom1,playoffs,terry1,terrier,laser1,lite,lancia,johngalt,jenjen,midori,maserati,matteo,miami1,riffraff,ronald1,1218,1026,123987,1015,1103,armada,architec,austria,gotmilk,cambridg,camero,flex,foreplay,getoff,glacier,glotest,froggie,gerbil,rugger,sanity72,donna1,orchard,oyster,palmtree,pajero,m5wkqf,magenta,luckyone,treefrog,vantage,usmarine,tyvugq,uptown,abacab,aaaaaa1,chuck1,darkange,cyclones,navajo,bubba123,iawgk2,hrfzlz,dylan1,enrico,encore,eclipse1,mutant,mizuno,mustang2,video1,viewer,weed420,whales,jaguar1,1990,159159,1love,bears1,bigtruck,bigboss,blitz,xqgann,yeahyeah,zeke,zardoz,stickman,3825,sentra,shiva,skipper1,singapor,southpaw,sonora,squid,slamdunk,slimjim,placid,photon,placebo,pearl1,test12,therock1,tiger123,leinad,legman,jeepers,joeblow,mike23,redcar,rhinos,rjw7x4,1102,13576479,112211,gwju3g,greywolf,7bgiqk,7878,535353,4snz9g,candyass,cccccc1,catfight,cali,fister,fosters,finland,frankie1,gizzmo,royalty,rugrat,dodo,oemdlg,out3xf,paddy,opennow,puppy1,qazwsxedc,ramjet,abraxas,cn42qj,dancer1,death666,nudity,nimda2k,buick,bobb,braves1,henrik,hooligan,everlast,karachi,mortis,monies,motocros,wally1,willie1,inspiron,1test,2929,bigblack,xytfu7,yackwin,zaq1xsw2,yy5rbfsc,100100,0660,tahiti,takehana,332211,3535,sedona,seawolf,skydiver,spleen,slash,spjfet,special1,slimshad,sopranos,spock1,penis1,patches1,thierry,thething,toohot,limpone,mash4077,matchbox,masterp,maxdog,ribbit,rockin,redhat,1113,14789632,1331,allday,aladin,andrey,amethyst,baseball1,athome,goofy1,greenman,goofball,ha8fyp,goodday,778899,charon,chappy,caracas,cardiff,capitals,canada1,cajun,catter,freddy1,favorite2,forme,forsaken,feelgood,gfxqx686,saskia,sanjose,salsa,dilbert1,dukeduke,downhill,longhair,locutus,lockdown,malachi,mamacita,lolipop,rainyday,pumpkin1,punker,prospect,rambo1,rainbows,quake,trinity1,trooper1,citation,coolcat,default,deniro,d9ungl,daddys,nautica,nermal,bukowski,bubbles1,bogota,buds,hulk,hitachi,ender,export,kikiki,kcchiefs,kram,morticia,montrose,mongo,waqw3p,wizzard,whdbtp,whkzyc,154ugeiu,1fuck,binky,bigred1,blubber,becky1,year2005,wonderfu,xrated,0001,tampabay,survey,tammy1,stuffer,3mpz4r,3000,3some,sierra1,shampoo,shyshy,slapnuts,standby,spartan1,sprocket,stanley1,poker1,theshit,lavalamp,light1,laserjet,jediknig,jjjjj1,mazda626,menthol,margaux,medic1,rhino1,1209,1234321,amigos,apricot,asdfgh1,hairball,hatter,grimace,7xm5rq,6789,cartoons,capcom,cashflow,carrots,fanatic,format,girlie,safeway,dogfart,dondon,outsider,odin,opiate,lollol,love12,mallrats,prague,primetime21,pugsley,r29hqq,valleywa,airman,abcdefg1,darkone,cummer,natedogg,nineball,ndeyl5,natchez,newone,normandy,nicetits,buddy123,buddys,homely,husky,iceland,hr3ytm,highlife,holla,earthlin,exeter,eatmenow,kimkim,k2trix,kernel,money123,moonman,miles1,mufasa,mousey,whites,warhamme,jackass1,2277,20spanks,blobby,blinky,bikers,blackjack,becca,blue23,xman,wyvern,085tzzqi,zxzxzx,zsmj2v,suede,t26gn4,sugars,tantra,swoosh,4226,4271,321123,383pdjvl,shane1,shelby1,spades,smother,sparhawk,pisser,photo1,pebble,peavey,pavement,thistle,kronos,lilbit,linux,melanie1,marbles,redlight,1208,1138,1008,alchemy,aolsucks,alexalex,atticus,auditt,b929ezzh,goodyear,gubber,863abgsg,7474,797979,464646,543210,4zqauf,4949,ch5nmk,carlito,chewey,carebear,checkmat,cheddar,chachi,forgetit,forlife,giants1,getit,gerhard,galileo,g3ujwg,ganja,rufus1,rushmore,discus,dudeman,olympus,oscars,osprey,madcow,locust,loyola,mammoth,proton,rabbit1,ptfe3xxp,pwxd5x,purple1,punkass,prophecy,uyxnyd,tyson1,aircraft,access99,abcabc,colts,civilwar,claudia1,contour,dddddd1,cypher,dapzu455,daisydog,noles,hoochie,hoser,eldiablo,kingrich,mudvayne,motown,mp8o6d,vipergts,italiano,2055,2211,bloke,blade1,yamato,zooropa,yqlgr667,050505,zxcvbnm1,zw6syj,suckcock,tango1,swampy,445566,333666,380zliki,sexpot,sexylady,sixtynin,sickboy,spiffy,skylark,sparkles,pintail,phreak,teller,timtim,thighs,latex,letsdoit,lkjhg,landmark,lizzard,marlins,marauder,metal1,manu,righton,1127,alain,alcat,amigo,basebal1,azertyui,azrael,hamper,gotenks,golfgti,hawkwind,h2slca,grace1,6chid8,789654,canine,casio,cazzo,cbr900,cabrio,calypso,capetown,feline,flathead,fisherma,flipmode,fungus,g9zns4,giggle,gabriel1,fuck123,saffron,dogmeat,dreamcas,dirtydog,douche,dresden,dickdick,destiny1,pappy,oaktree,luft4,puta,ramada,trumpet1,vcradq,tulip,tracy71,tycoon,aaaaaaa1,conquest,chitown,creepers,cornhole,danman,dada,density,d9ebk7,darth,nirvana1,nestle,brenda1,bonanza,hotspur,hufmqw,electro,erasure,elisabet,etvww4,ewyuza,eric1,kenken,kismet,klaatu,milamber,willi,isacs155,igor,1million,1letmein,x35v8l,yogi,ywvxpz,xngwoj,zippy1,020202,****,stonewal,sentry,sexsexsex,sonysony,smirnoff,star12,solace,star1,pkxe62,pilot1,pommes,paulpaul,tical,tictac,lighthou,lemans,kubrick,letmein22,letmesee,jys6wz,jonesy,jjjjjj1,jigga,redstorm,riley1,14141414,1126,allison1,badboy1,asthma,auggie,hardwood,gumbo,616913,57np39,56qhxs,4mnveh,fatluvr69,fqkw5m,fidelity,feathers,fresno,godiva,gecko,gibson1,gogators,general1,saxman,rowing,sammys,scotts,scout1,sasasa,samoht,dragon69,ducky,dragonball,driller,p3wqaw,papillon,oneone,openit,optimist,longshot,rapier,pussy2,ralphie,tuxedo,undertow,copenhag,delldell,culinary,deltas,mytime,noname,noles1,bucker,bopper,burnout,ibilltes,hihje863,hitter,ekim,espana,eatme69,elpaso,express1,eeeeee1,eatme1,karaoke,mustang5,wellingt,willem,waterski,webcam,jasons,infinite,iloveyou!,jakarta,belair,bigdad,beerme,yoshi,yinyang,x24ik3,063dyjuy,0000007,ztmfcq,stopit,stooges,symow8,strato,2hot4u,skins,shakes,sex1,snacks,softtail,slimed123,pizzaman,tigercat,tonton,lager,lizzy,juju,john123,jesse1,jingles,martian,mario1,rootedit,rochard,redwine,requiem,riverrat,1117,1014,1205,amor,amiga,alpina,atreides,banana1,bahamut,golfman,happines,7uftyx,5432,5353,5151,4747,foxfire,ffvdj474,foreskin,gayboy,gggggg1,gameover,glitter,funny1,scoobydoo,saxophon,dingbat,digimon,omicron,panda1,loloxx,macintos,lululu,lollypop,racer1,queen1,qwertzui,upnfmc,tyrant,trout1,9skw5g,aceman,acls2h,aaabbb,acapulco,aggie,comcast,cloudy,cq2kph,d6o8pm,cybersex,davecole,darian,crumbs,davedave,dasani,mzepab,myporn,narnia,booger1,bravo1,budgie,btnjey,highlander,hotel6,humbug,ewtosi,kristin1,kobe,knuckles,keith1,katarina,muff,muschi,montana1,wingchun,wiggle,whatthe,vette1,vols,virago,intj3a,ishmael,jachin,illmatic,199999,2010,blender,bigpenis,bengal,blue1234,zaqxsw,xray,xxxxxxx1,zebras,yanks,tadpole,stripes,3737,4343,3728,4444444,368ejhih,solar,sonne,sniffer,sonata,squirts,playstation,pktmxr,pescator,texaco,lesbos,l8v53x,jo9k2jw2,jimbeam,jimi,jupiter2,jurassic,marines1,rocket1,14725836,12345679,1219,123098,1233,alessand,althor,arch,alpha123,basher,barefeet,balboa,bbbbb1,badabing,gopack,golfnut,gsxr1000,gregory1,766rglqy,8520,753159,8dihc6,69camaro,666777,cheeba,chino,cheeky,camel1,fishcake,flubber,gianni,gnasher23,frisbee,fuzzy1,fuzzball,save13tx,russell1,sandra1,scrotum,scumbag,sabre,samdog,dripping,dragon12,dragster,orwell,mainland,maine,qn632o,poophead,rapper,porn4life,rapunzel,velocity,vanessa1,trueblue,vampire1,abacus,902100,crispy,chooch,d6wnro,dabulls,dehpye,navyseal,njqcw4,nownow,nigger1,nightowl,nonenone,nightmar,bustle,buddy2,boingo,bugman,bosshog,hybrid,hillside,hilltop,hotlegs,hzze929b,hhhhh1,hellohel,evilone,edgewise,e5pftu,eded,embalmer,excalibur,elefant,kenzie,killah,kleenex,mouses,mounta1n,motors,mutley,muffdive,vivitron,w00t88,iloveit,jarjar,incest,indycar,17171717,1664,17011701,222777,2663,beelch,benben,yitbos,yyyyy1,zzzzz1,stooge,tangerin,taztaz,stewart1,summer69,system1,surveyor,stirling,3qvqod,3way,456321,sizzle,simhrq,sparty,ssptx452,sphere,persian,ploppy,pn5jvw,poobear,pianos,plaster,testme,tiff,thriller,master12,rockey,1229,1217,1478,1009,anastasi,amonra,argentin,albino,azazel,grinder,6uldv8,83y6pv,8888888,4tlved,515051,carsten,flyers88,ffffff1,firehawk,firedog,flashman,ggggg1,godspeed,galway,giveitup,funtimes,gohan,giveme,geryfe,frenchie,sayang,rudeboy,sandals,dougal,drag0n,dga9la,desktop,onlyone,otter,pandas,mafia,luckys,lovelife,manders,qqh92r,qcmfd454,radar1,punani,ptbdhw,turtles,undertaker,trs8f7,ugejvp,abba,911turbo,acdc,abcd123,crash1,colony,delboy,davinci,notebook,nitrox,borabora,bonzai,brisbane,heeled,hooyah,hotgirl,i62gbq,horse1,hpk2qc,epvjb6,mnbvc,mommy1,munster,wiccan,2369,bettyboo,blondy,bismark,beanbag,bjhgfi,blackice,yvtte545,ynot,yess,zlzfrh,wolvie,007bond,******,tailgate,tanya1,sxhq65,stinky1,3234412,3ki42x,seville,shimmer,sienna,shitshit,skillet,sooners1,solaris,smartass,pedros,pennywis,pfloyd,tobydog,thetruth,letme1n,mario66,micky,rocky2,rewq,reindeer,1128,1207,1104,1432,aprilia,allstate,bagels,baggies,barrage,guru,72d5tn,606060,4wcqjn,chance1,flange,fartman,geil,gbhcf2,fussball,fuaqz4,gameboy,geneviev,rotary,seahawk,saab,samadams,devlt4,ditto,drevil,drinker,deuce,dipstick,octopus,ottawa,losangel,loverman,porky,q9umoz,rapture,pussy4me,triplex,ue8fpw,turbos,aaa340,churchil,crazyman,cutiepie,ddddd1,dejavu,cuxldv,nbvibt,nikon,niko,nascar1,bubba2,boobear,boogers,bullwink,bulldawg,horsemen,escalade,eagle2,dynamic,efyreg,minnesot,mogwai,msnxbi,mwq6qlzo,werder,verygood,voodoo1,iiiiii1,159951,1624,1911a1,2244,bellagio,bedlam,belkin,bill1,xirt2k,??????,susieq,sundown,sukebe,swifty,2fast4u,sexe,shroom,seaweed,skeeter1,snicker,spanky1,spook,phaedrus,pilots,peddler,thumper1,tiger7,tmjxn151,thematri,l2g7k3,letmeinn,jeffjeff,johnmish,mantra,mike69,mazda6,riptide,robots,1107,1130,142857,11001001,1134,armored,allnight,amatuers,bartok,astral,baboon,balls1,bassoon,hcleeb,happyman,granite,graywolf,golf1,gomets,8vjzus,7890,789123,8uiazp,5757,474jdvff,551scasi,50cent,camaro1,cherry1,chemist,firenze,fishtank,freewill,glendale,frogfrog,ganesh,scirocco,devilman,doodles,okinawa,olympic,orpheus,ohmygod,paisley,pallmall,lunchbox,manhatta,mahalo,mandarin,qwqwqw,qguvyt,pxx3eftp,rambler,poppy1,turk182,vdlxuc,tugboat,valiant,uwrl7c,chris123,cmfnpu,decimal,debbie1,dandy,daedalus,natasha1,nissan1,nancy123,nevermin,napalm,newcastle,bonghit,ibxnsm,hhhhhh1,holger,edmonton,equinox,dvader,kimmy,knulla,mustafa,monsoon,mistral,morgana,monica1,mojave,monterey,mrbill,vkaxcs,victor1,violator,vfdhif,wilson1,wavpzt,wildstar,winter99,iqzzt580,imback,1914,19741974,1monkey,1q2w3e4r5t,2500,2255,bigshow,bigbucks,blackcoc,zoomer,wtcacq,wobble,xmen,xjznq5,yesterda,yhwnqc,zzzxxx,393939,2fchbg,skinhead,skilled,shadow12,seaside,sinful,silicon,smk7366,snapshot,sniper1,soccer11,smutty,peepers,plokij,pdiddy,pimpdaddy,thrust,terran,topaz,today1,lionhear,littlema,lauren1,lincoln1,lgnu9d,juneau,methos,rogue1,romulus,redshift,1202,1469,12locked,arizona1,alfarome,al9agd,aol123,altec,apollo1,arse,baker1,bbb747,axeman,astro1,hawthorn,goodfell,hawks1,gstring,hannes,8543852,868686,4ng62t,554uzpad,5401,567890,5232,catfood,fire1,flipflop,fffff1,fozzie,fluff,fzappa,rustydog,scarab,satin,ruger,samsung1,destin,diablo2,dreamer1,detectiv,doqvq3,drywall,paladin1,papabear,offroad,panasonic,nyyankee,luetdi,qcfmtz,pyf8ah,puddles,pussyeat,ralph1,princeto,trivia,trewq,tri5a3,advent,9898,agyvorc,clarkie,coach1,courier,christo,chowder,cyzkhw,davidb,dad2ownu,daredevi,de7mdf,nazgul,booboo1,bonzo,butch1,huskers1,hgfdsa,hornyman,elektra,england1,elodie,kermit1,kaboom,morten,mocha,monday1,morgoth,weewee,weenie,vorlon,wahoo,ilovegod,insider,jayman,1911,1dallas,1900,1ranger,201jedlz,2501,1qaz,bignuts,bigbad,beebee,billows,belize,wvj5np,wu4etd,yamaha1,wrinkle5,zebra1,yankee1,zoomzoom,09876543,0311,?????,stjabn,tainted,3tmnej,skooter,skelter,starlite,spice1,stacey1,smithy,pollux,peternorth,pixie,piston,poets,toons,topspin,kugm7b,legends,jeepjeep,joystick,junkmail,jojojojo,jonboy,midland,mayfair,riches,reznor,rockrock,reboot,renee1,roadway,rasta220,1411,1478963,1019,archery,andyandy,barks,bagpuss,auckland,gooseman,hazmat,gucci,grammy,happydog,7kbe9d,7676,6bjvpe,5lyedn,5858,5291,charlie2,c7lrwu,candys,chateau,ccccc1,cardinals,fihdfv,fortune12,gocats,gaelic,fwsadn,godboy,gldmeo,fx3tuo,fubar1,generals,gforce,rxmtkp,rulz,sairam,dunhill,dogggg,ozlq6qwm,ov3ajy,lockout,makayla,macgyver,mallorca,prima,pvjegu,qhxbij,prelude1,totoro,tusymo,trousers,tulane,turtle1,tracy1,aerosmit,abbey1,clticic,cooper1,comets,delpiero,cyprus,dante1,dave1,nounours,nexus6,nogard,norfolk,brent1,booyah,bootleg,bulls23,bulls1,booper,heretic,icecube,hellno,hounds,honeydew,hooters1,hoes,hevnm4,hugohugo,epson,evangeli,eeeee1,eyphed".split(","))),
        r("english",q("you,i,to,the,a,and,that,it,of,me,what,is,in,this,know,i'm,for,no,have,my,don't,just,not,do,be,on,your,was,we,it's,with,so,but,all,well,are,he,oh,about,right,you're,get,here,out,going,like,yeah,if,her,she,can,up,want,think,that's,now,go,him,at,how,got,there,one,did,why,see,come,good,they,really,as,would,look,when,time,will,okay,back,can't,mean,tell,i'll,from,hey,were,he's,could,didn't,yes,his,been,or,something,who,because,some,had,then,say,ok,take,an,way,us,little,make,need,gonna,never,we're,too,she's,i've,sure,them,more,over,our,sorry,where,what's,let,thing,am,maybe,down,man,has,uh,very,by,there's,should,anything,said,much,any,life,even,off,doing,thank,give,only,thought,help,two,talk,people,god,still,wait,into,find,nothing,again,things,let's,doesn't,call,told,great,before,better,ever,night,than,away,first,believe,other,feel,everything,work,you've,fine,home,after,last,these,day,keep,does,put,around,stop,they're,i'd,guy,isn't,always,listen,wanted,mr,guys,huh,those,big,lot,happened,thanks,won't,trying,kind,wrong,through,talking,made,new,being,guess,hi,care,bad,mom,remember,getting,we'll,together,dad,leave,place,understand,wouldn't,actually,hear,baby,nice,father,else,stay,done,wasn't,their,course,might,mind,every,enough,try,hell,came,someone,you'll,own,family,whole,another,house,yourself,idea,ask,best,must,coming,old,looking,woman,which,years,room,left,knew,tonight,real,son,hope,name,same,went,um,hmm,happy,pretty,saw,girl,sir,show,friend,already,saying,next,three,job,problem,minute,found,world,thinking,haven't,heard,honey,matter,myself,couldn't,exactly,having,ah,probably,happen,we've,hurt,boy,both,while,dead,gotta,alone,since,excuse,start,kill,hard,you'd,today,car,ready,until,without,wants,hold,wanna,yet,seen,deal,took,once,gone,called,morning,supposed,friends,head,stuff,most,used,worry,second,part,live,truth,school,face,forget,true,business,each,cause,soon,knows,few,telling,wife,who's,use,chance,run,move,anyone,person,bye,somebody,dr,heart,such,miss,married,point,later,making,meet,anyway,many,phone,reason,damn,lost,looks,bring,case,turn,wish,tomorrow,kids,trust,check,change,end,late,anymore,five,least,town,aren't,ha,working,year,makes,taking,means,brother,play,hate,ago,says,beautiful,gave,fact,crazy,party,sit,open,afraid,between,important,rest,fun,kid,word,watch,glad,everyone,days,sister,minutes,everybody,bit,couple,whoa,either,mrs,feeling,daughter,wow,gets,asked,under,break,promise,door,set,close,hand,easy,question,tried,far,walk,needs,mine,though,times,different,killed,hospital,anybody,alright,wedding,shut,able,die,perfect,stand,comes,hit,story,ya,mm,waiting,dinner,against,funny,husband,almost,pay,answer,four,office,eyes,news,child,shouldn't,half,side,yours,moment,sleep,read,where's,started,men,sounds,sonny,pick,sometimes,em,bed,also,date,line,plan,hours,lose,hands,serious,behind,inside,high,ahead,week,wonderful,fight,past,cut,quite,number,he'll,sick,it'll,game,eat,nobody,goes,along,save,seems,finally,lives,worried,upset,carly,met,book,brought,seem,sort,safe,living,children,weren't,leaving,front,shot,loved,asking,running,clear,figure,hot,felt,six,parents,drink,absolutely,how's,daddy,alive,sense,meant,happens,special,bet,blood,ain't,kidding,lie,full,meeting,dear,seeing,sound,fault,water,ten,women,buy,months,hour,speak,lady,jen,thinks,christmas,body,order,outside,hang,possible,worse,company,mistake,ooh,handle,spend,totally,giving,control,here's,marriage,realize,president,unless,sex,send,needed,taken,died,scared,picture,talked,ass,hundred,changed,completely,explain,playing,certainly,sign,boys,relationship,loves,hair,lying,choice,anywhere,future,weird,luck,she'll,turned,known,touch,kiss,crane,questions,obviously,wonder,pain,calling,somewhere,throw,straight,cold,fast,words,food,none,drive,feelings,they'll,worked,marry,light,drop,cannot,sent,city,dream,protect,twenty,class,surprise,its,sweetheart,poor,looked,mad,except,gun,y'know,dance,takes,appreciate,especially,situation,besides,pull,himself,hasn't,act,worth,sheridan,amazing,top,given,expect,rather,involved,swear,piece,busy,law,decided,happening,movie,we'd,catch,country,less,perhaps,step,fall,watching,kept,darling,dog,win,air,honor,personal,moving,till,admit,problems,murder,he'd,evil,definitely,feels,information,honest,eye,broke,missed,longer,dollars,tired,evening,human,starting,red,entire,trip,club,niles,suppose,calm,imagine,fair,caught,blame,street,sitting,favor,apartment,court,terrible,clean,learn,works,frasier,relax,million,accident,wake,prove,smart,message,missing,forgot,interested,table,nbsp,become,mouth,pregnant,middle,ring,careful,shall,team,ride,figured,wear,shoot,stick,follow,angry,instead,write,stopped,early,ran,war,standing,forgive,jail,wearing,kinda,lunch,cristian,eight,greenlee,gotten,hoping,phoebe,thousand,ridge,paper,tough,tape,state,count,boyfriend,proud,agree,birthday,seven,they've,history,share,offer,hurry,feet,wondering,decision,building,ones,finish,voice,herself,would've,list,mess,deserve,evidence,cute,dress,interesting,hotel,quiet,concerned,road,staying,beat,sweetie,mention,clothes,finished,fell,neither,mmm,fix,respect,spent,prison,attention,holding,calls,near,surprised,bar,keeping,gift,hadn't,putting,dark,self,owe,using,ice,helping,normal,aunt,lawyer,apart,certain,plans,jax,girlfriend,floor,whether,everything's,present,earth,box,cover,judge,upstairs,sake,mommy,possibly,worst,station,acting,accept,blow,strange,saved,conversation,plane,mama,yesterday,lied,quick,lately,stuck,report,difference,rid,store,she'd,bag,bought,doubt,listening,walking,cops,deep,dangerous,buffy,sleeping,chloe,rafe,shh,record,lord,moved,join,card,crime,gentlemen,willing,window,return,walked,guilty,likes,fighting,difficult,soul,joke,favorite,uncle,promised,public,bother,island,seriously,cell,lead,knowing,broken,advice,somehow,paid,losing,push,helped,killing,usually,earlier,boss,beginning,liked,innocent,doc,rules,cop,learned,thirty,risk,letting,speaking,officer,ridiculous,support,afternoon,born,apologize,seat,nervous,across,song,charge,patient,boat,how'd,hide,detective,planning,nine,huge,breakfast,horrible,age,awful,pleasure,driving,hanging,picked,sell,quit,apparently,dying,notice,congratulations,chief,one's,month,visit,could've,c'mon,letter,decide,double,sad,press,forward,fool,showed,smell,seemed,spell,memory,pictures,slow,seconds,hungry,board,position,hearing,roz,kitchen,ma'am,force,fly,during,space,should've,realized,experience,kick,others,grab,mother's,discuss,third,cat,fifty,responsible,fat,reading,idiot,yep,suddenly,agent,destroy,bucks,track,shoes,scene,peace,arms,demon,low,livvie,consider,papers,medical,incredible,witch,drunk,attorney,tells,knock,ways,gives,department,nose,skye,turns,keeps,jealous,drug,sooner,cares,plenty,extra,tea,won,attack,ground,whose,outta,weekend,matters,wrote,type,father's,gosh,opportunity,impossible,books,waste,pretend,named,jump,eating,proof,complete,slept,career,arrest,breathe,perfectly,warm,pulled,twice,easier,goin,dating,suit,romantic,drugs,comfortable,finds,checked,fit,divorce,begin,ourselves,closer,ruin,although,smile,laugh,treat,god's,fear,what'd,guy's,otherwise,excited,mail,hiding,cost,stole,pacey,noticed,fired,excellent,lived,bringing,pop,bottom,note,sudden,bathroom,flight,honestly,sing,foot,games,remind,bank,charges,witness,finding,places,tree,dare,hardly,that'll,interest,steal,silly,contact,teach,shop,plus,colonel,fresh,trial,invited,roll,radio,reach,heh,choose,emergency,dropped,credit,obvious,cry,locked,loving,positive,nuts,agreed,prue,goodbye,condition,guard,fuckin,grow,cake,mood,dad's,total,crap,crying,belong,lay,partner,trick,pressure,ohh,arm,dressed,cup,lies,bus,taste,neck,south,something's,nurse,raise,lots,carry,group,whoever,drinking,they'd,breaking,file,lock,wine,closed,writing,spot,paying,study,assume,asleep,man's,turning,legal,viki,bedroom,shower,nikolas,camera,fill,reasons,forty,bigger,nope,breath,doctors,pants,level,movies,gee,area,folks,ugh,continue,focus,wild,truly,desk,convince,client,threw,band,hurts,spending,allow,grand,answers,shirt,chair,allowed,rough,doin,sees,government,ought,empty,round,hat,wind,shows,aware,dealing,pack,meaning,hurting,ship,subject,guest,mom's,pal,match,arrested,salem,confused,surgery,expecting,deacon,unfortunately,goddamn,lab,passed,bottle,beyond,whenever,pool,opinion,held,common,starts,jerk,secrets,falling,played,necessary,barely,dancing,health,tests,copy,cousin,planned,dry,ahem,twelve,simply,tess,skin,often,fifteen,speech,names,issue,orders,nah,final,results,code,believed,complicated,umm,research,nowhere,escape,biggest,restaurant,grateful,usual,burn,address,within,someplace,screw,everywhere,train,film,regret,goodness,mistakes,details,responsibility,suspect,corner,hero,dumb,terrific,further,gas,whoo,hole,memories,o'clock,following,ended,nobody's,teeth,ruined,split,airport,bite,stenbeck,older,liar,showing,project,cards,desperate,themselves,pathetic,damage,spoke,quickly,scare,marah,afford,vote,settle,mentioned,due,stayed,rule,checking,tie,hired,upon,heads,concern,blew,natural,alcazar,champagne,connection,tickets,happiness,form,saving,kissing,hated,personally,suggest,prepared,build,leg,onto,leaves,downstairs,ticket,it'd,taught,loose,holy,staff,sea,duty,convinced,throwing,defense,kissed,legs,according,loud,practice,saturday,babies,army,where'd,warning,miracle,carrying,flying,blind,ugly,shopping,hates,someone's,sight,bride,coat,account,states,clearly,celebrate,brilliant,wanting,add,forrester,lips,custody,center,screwed,buying,size,toast,thoughts,student,stories,however,professional,reality,birth,lexie,attitude,advantage,grandfather,sami,sold,opened,grandma,beg,changes,someday,grade,roof,brothers,signed,ahh,marrying,powerful,grown,grandmother,fake,opening,expected,eventually,must've,ideas,exciting,covered,familiar,bomb,bout,television,harmony,color,heavy,schedule,records,capable,practically,including,correct,clue,forgotten,immediately,appointment,social,nature,deserves,threat,bloody,lonely,ordered,shame,local,jacket,hook,destroyed,scary,investigation,above,invite,shooting,port,lesson,criminal,growing,caused,victim,professor,followed,funeral,nothing's,considering,burning,strength,loss,view,gia,sisters,everybody's,several,pushed,written,somebody's,shock,pushing,heat,chocolate,greatest,miserable,corinthos,nightmare,brings,zander,character,became,famous,enemy,crash,chances,sending,recognize,healthy,boring,feed,engaged,percent,headed,lines,treated,purpose,knife,rights,drag,san,fan,badly,hire,paint,pardon,built,behavior,closet,warn,gorgeous,milk,survive,forced,operation,offered,ends,dump,rent,remembered,lieutenant,trade,thanksgiving,rain,revenge,physical,available,program,prefer,baby's,spare,pray,disappeared,aside,statement,sometime,meat,fantastic,breathing,laughing,itself,tip,stood,market,affair,ours,depends,main,protecting,jury,national,brave,large,jack's,interview,fingers,murdered,explanation,process,picking,based,style,pieces,blah,assistant,stronger,aah,pie,handsome,unbelievable,anytime,nearly,shake,everyone's,oakdale,cars,wherever,serve,pulling,points,medicine,facts,waited,lousy,circumstances,stage,disappointed,weak,trusted,license,nothin,community,trash,understanding,slip,cab,sounded,awake,friendship,stomach,weapon,threatened,mystery,official,regular,river,vegas,understood,contract,race,basically,switch,frankly,issues,cheap,lifetime,deny,painting,ear,clock,weight,garbage,why'd,tear,ears,dig,selling,setting,indeed,changing,singing,tiny,particular,draw,decent,avoid,messed,filled,touched,score,people's,disappear,exact,pills,kicked,harm,recently,fortune,pretending,raised,insurance,fancy,drove,cared,belongs,nights,shape,lorelai,base,lift,stock,sonny's,fashion,timing,guarantee,chest,bridge,woke,source,patients,theory,original,burned,watched,heading,selfish,oil,drinks,failed,period,doll,committed,elevator,freeze,noise,exist,science,pair,edge,wasting,sat,ceremony,pig,uncomfortable,peg,guns,staring,files,bike,weather,name's,mostly,stress,permission,arrived,thrown,possibility,example,borrow,release,ate,notes,hoo,library,property,negative,fabulous,event,doors,screaming,xander,term,what're,meal,fellow,apology,anger,honeymoon,wet,bail,parking,non,protection,fixed,families,chinese,campaign,map,wash,stolen,sensitive,stealing,chose,lets,comfort,worrying,whom,pocket,mateo,bleeding,students,shoulder,ignore,fourth,neighborhood,fbi,talent,tied,garage,dies,demons,dumped,witches,training,rude,crack,model,bothering,radar,grew,remain,soft,meantime,gimme,connected,kinds,cast,sky,likely,fate,buried,hug,brother's,concentrate,prom,messages,east,unit,intend,crew,ashamed,somethin,manage,guilt,weapons,terms,interrupt,guts,tongue,distance,conference,treatment,shoe,basement,sentence,purse,glasses,cabin,universe,towards,repeat,mirror,wound,travers,tall,reaction,odd,engagement,therapy,letters,emotional,runs,magazine,jeez,decisions,soup,daughter's,thrilled,society,managed,stake,chef,moves,extremely,entirely,moments,expensive,counting,shots,kidnapped,square,son's,cleaning,shift,plate,impressed,smells,trapped,male,tour,aidan,knocked,charming,attractive,argue,puts,whip,language,embarrassed,settled,package,laid,animals,hitting,disease,bust,stairs,alarm,pure,nail,nerve,incredibly,walks,dirt,stamp,sister's,becoming,terribly,friendly,easily,damned,jobs,suffering,disgusting,stopping,deliver,riding,helps,federal,disaster,bars,dna,crossed,rate,create,trap,claim,california,talks,eggs,effect,chick,threatening,spoken,introduce,confession,embarrassing,bags,impression,gate,year's,reputation,attacked,among,knowledge,presents,inn,europe,chat,suffer,argument,talkin,crowd,homework,fought,coincidence,cancel,accepted,rip,pride,solve,hopefully,pounds,pine,mate,illegal,generous,streets,con,separate,outfit,maid,bath,punch,mayor,freaked,begging,recall,enjoying,bug,woman's,prepare,parts,wheel,signal,direction,defend,signs,painful,yourselves,rat,maris,amount,that'd,suspicious,flat,cooking,button,warned,sixty,pity,parties,crisis,coach,row,yelling,leads,awhile,pen,confidence,offering,falls,image,farm,pleased,panic,hers,gettin,role,refuse,determined,hell's,grandpa,progress,testify,passing,military,choices,uhh,gym,cruel,wings,bodies,mental,gentleman,coma,cutting,proteus,guests,girl's,expert,benefit,faces,cases,led,jumped,toilet,secretary,sneak,mix,firm,halloween,agreement,privacy,dates,anniversary,smoking,reminds,pot,created,twins,swing,successful,season,scream,considered,solid,options,commitment,senior,ill,else's,crush,ambulance,wallet,discovered,officially,til,rise,reached,eleven,option,laundry,former,assure,stays,skip,fail,accused,wide,challenge,popular,learning,discussion,clinic,plant,exchange,betrayed,bro,sticking,university,members,lower,bored,mansion,soda,sheriff,suite,handled,busted,senator,load,happier,younger,studying,romance,procedure,ocean,section,sec,commit,assignment,suicide,minds,swim,ending,bat,yell,llanview,league,chasing,seats,proper,command,believes,humor,hopes,fifth,winning,solution,leader,theresa's,sale,lawyers,nor,material,latest,highly,escaped,audience,parent,tricks,insist,dropping,cheer,medication,higher,flesh,district,routine,century,shared,sandwich,handed,false,beating,appear,warrant,family's,awfully,odds,article,treating,thin,suggesting,fever,sweat,silent,specific,clever,sweater,request,prize,mall,tries,mile,fully,estate,union,sharing,assuming,judgment,goodnight,divorced,despite,surely,steps,jet,confess,math,listened,comin,answered,vulnerable,bless,dreaming,rooms,chip,zero,potential,pissed,nate,kills,tears,knees,chill,carly's,brains,agency,harvard,degree,unusual,wife's,joint,packed,dreamed,cure,covering,newspaper,lookin,coast,grave,egg,direct,cheating,breaks,quarter,mixed,locker,husband's,gifts,awkward,toy,thursday,rare,policy,kid's,joking,competition,classes,assumed,reasonable,dozen,curse,quartermaine,millions,dessert,rolling,detail,alien,served,delicious,closing,vampires,released,ancient,wore,value,tail,secure,salad,murderer,hits,toward,spit,screen,offense,dust,conscience,bread,answering,admitted,lame,invitation,grief,smiling,path,stands,bowl,pregnancy,hollywood,prisoner,delivery,guards,virus,shrink,influence,freezing,concert,wreck,partners,massimo,chain,birds,life's,wire,technically,presence,blown,anxious,cave,version,holidays,cleared,wishes,survived,caring,candles,bound,related,charm,yup,pulse,jumping,jokes,frame,boom,vice,performance,occasion,silence,opera,nonsense,frightened,downtown,americans,slipped,dimera,blowing,world's,session,relationships,kidnapping,actual,spin,civil,roxy,packing,education,blaming,wrap,obsessed,fruit,torture,personality,location,effort,daddy's,commander,trees,there'll,owner,fairy,per,other's,necessarily,county,contest,seventy,print,motel,fallen,directly,underwear,grams,exhausted,believing,particularly,freaking,carefully,trace,touching,messing,committee,recovery,intention,consequences,belt,sacrifice,courage,officers,enjoyed,lack,attracted,appears,bay,yard,returned,remove,nut,carried,today's,testimony,intense,granted,violence,heal,defending,attempt,unfair,relieved,political,loyal,approach,slowly,plays,normally,buzz,alcohol,actor,surprises,psychiatrist,pre,plain,attic,who'd,uniform,terrified,sons,pet,cleaned,zach,threaten,teaching,mum,motion,fella,enemies,desert,collection,incident,failure,satisfied,imagination,hooked,headache,forgetting,counselor,andie,acted,opposite,highest,equipment,badge,italian,visiting,naturally,frozen,commissioner,sakes,labor,appropriate,trunk,armed,thousands,received,dunno,costume,temporary,sixteen,impressive,zone,kicking,junk,hon,grabbed,unlike,understands,describe,clients,owns,affect,witnesses,starving,instincts,happily,discussing,deserved,strangers,leading,intelligence,host,authority,surveillance,cow,commercial,admire,questioning,fund,dragged,barn,object,deeply,amp,wrapped,wasted,tense,route,reports,hoped,fellas,election,roommate,mortal,fascinating,chosen,stops,shown,arranged,abandoned,sides,delivered,becomes,arrangements,agenda,began,theater,series,literally,propose,honesty,underneath,forces,services,sauce,promises,lecture,eighty,torn,shocked,relief,explained,counter,circle,victims,transfer,response,channel,identity,differently,campus,spy,ninety,interests,guide,deck,biological,pheebs,ease,creep,will's,waitress,skills,telephone,ripped,raising,scratch,rings,prints,wave,thee,arguing,figures,ephram,asks,reception,pin,oops,diner,annoying,agents,taggert,goal,mass,ability,sergeant,julian's,international,gig,blast,basic,tradition,towel,earned,rub,president's,habit,customers,creature,bermuda,actions,snap,react,prime,paranoid,wha,handling,eaten,therapist,comment,charged,tax,sink,reporter,beats,priority,interrupting,gain,fed,warehouse,shy,pattern,loyalty,inspector,events,pleasant,media,excuses,threats,permanent,guessing,financial,demand,assault,tend,praying,motive,los,unconscious,trained,museum,tracks,range,nap,mysterious,unhappy,tone,switched,rappaport,award,sookie,neighbor,loaded,gut,childhood,causing,swore,piss,hundreds,balance,background,toss,mob,misery,valentine's,thief,squeeze,lobby,hah,goa'uld,geez,exercise,ego,drama,al's,forth,facing,booked,boo,songs,sandburg,eighteen,d'you,bury,perform,everyday,digging,creepy,compared,wondered,trail,liver,hmmm,drawn,device,magical,journey,fits,discussed,supply,moral,helpful,attached,timmy's,searching,flew,depressed,aisle,underground,pro,daughters,cris,amen,vows,proposal,pit,neighbors,darn,cents,arrange,annulment,uses,useless,squad,represent,product,joined,afterwards,adventure,resist,protected,net,fourteen,celebrating,piano,inch,flag,debt,violent,tag,sand,gum,dammit,teal'c,hip,celebration,below,reminded,claims,tonight's,replace,phones,paperwork,emotions,typical,stubborn,stable,sheridan's,pound,papa,lap,designed,current,bum,tension,tank,suffered,steady,provide,overnight,meanwhile,chips,beef,wins,suits,boxes,salt,cassadine,collect,boy's,tragedy,therefore,spoil,realm,profile,degrees,wipe,surgeon,stretch,stepped,nephew,neat,limo,confident,anti,perspective,designer,climb,title,suggested,punishment,finest,ethan's,springfield,occurred,hint,furniture,blanket,twist,surrounded,surface,proceed,lip,fries,worries,refused,niece,gloves,soap,signature,disappoint,crawl,convicted,zoo,result,pages,lit,flip,counsel,doubts,crimes,accusing,when's,shaking,remembering,phase,hallway,halfway,bothered,useful,makeup,madam,gather,concerns,cia,cameras,blackmail,symptoms,rope,ordinary,imagined,concept,cigarette,supportive,memorial,explosion,yay,woo,trauma,ouch,leo's,furious,cheat,avoiding,whew,thick,oooh,boarding,approve,urgent,shhh,misunderstanding,minister,drawer,sin,phony,joining,jam,interfere,governor,chapter,catching,bargain,tragic,schools,respond,punish,penthouse,hop,thou,remains,rach,ohhh,insult,doctor's,bugs,beside,begged,absolute,strictly,stefano,socks,senses,ups,sneaking,yah,serving,reward,polite,checks,tale,physically,instructions,fooled,blows,tabby,internal,bitter,adorable,y'all,tested,suggestion,string,jewelry,debate,com,alike,pitch,fax,distracted,shelter,lessons,foreign,average,twin,friend's,damnit,constable,circus,audition,tune,shoulders,mud,mask,helpless,feeding,explains,dated,robbery,objection,behave,valuable,shadows,courtroom,confusing,tub,talented,struck,smarter,mistaken,italy,customer,bizarre,scaring,punk,motherfucker,holds,focused,alert,activity,vecchio,reverend,highway,foolish,compliment,bastards,attend,scheme,aid,worker,wheelchair,protective,poetry,gentle,script,reverse,picnic,knee,intended,construction,cage,wednesday,voices,toes,stink,scares,pour,effects,cheated,tower,time's,slide,ruining,recent,jewish,filling,exit,cottage,corporate,upside,supplies,proves,parked,instance,grounds,diary,complaining,basis,wounded,thing's,politics,confessed,pipe,merely,massage,data,chop,budget,brief,spill,prayer,costs,betray,begins,arrangement,waiter,scam,rats,fraud,flu,brush,anyone's,adopted,tables,sympathy,pill,pee,web,seventeen,landed,expression,entrance,employee,drawing,cap,bracelet,principal,pays,jen's,fairly,facility,dru,deeper,arrive,unique,tracking,spite,shed,recommend,oughta,nanny,naive,menu,grades,diet,corn,authorities,separated,roses,patch,dime,devastated,description,tap,subtle,include,citizen,bullets,beans,ric,pile,las,executive,confirm,toe,strings,parade,harbor,charity's,bow,borrowed,toys,straighten,steak,status,remote,premonition,poem,planted,honored,youth,specifically,meetings,exam,convenient,traveling,matches,laying,insisted,apply,units,technology,dish,aitoro,sis,kindly,grandson,donor,temper,teenager,strategy,richard's,proven,iron,denial,couples,backwards,tent,swell,noon,happiest,episode,drives,thinkin,spirits,potion,fence,affairs,acts,whatsoever,rehearsal,proved,overheard,nuclear,lemme,hostage,faced,constant,bench,tryin,taxi,shove,sets,moron,limits,impress,entitled,needle,limit,lad,intelligent,instant,forms,disagree,stinks,rianna,recover,paul's,losers,groom,gesture,developed,constantly,blocks,bartender,tunnel,suspects,sealed,removed,legally,illness,hears,dresses,aye,vehicle,thy,teachers,sheet,receive,psychic,night's,denied,knocking,judging,bible,behalf,accidentally,waking,ton,superior,seek,rumor,natalie's,manners,homeless,hollow,desperately,critical,theme,tapes,referring,personnel,item,genoa,gear,majesty,fans,exposed,cried,tons,spells,producer,launch,instinct,belief,quote,motorcycle,convincing,appeal,advance,greater,fashioned,aids,accomplished,mommy's,grip,bump,upsetting,soldiers,scheduled,production,needing,invisible,forgiveness,feds,complex,compare,bothers,tooth,territory,sacred,mon,jessica's,inviting,inner,earn,compromise,cocktail,tramp,temperature,signing,landing,jabot,intimate,dignity,dealt,souls,informed,gods,entertainment,dressing,cigarettes,blessing,billion,alistair,upper,manner,lightning,leak,heaven's,fond,corky,alternative,seduce,players,operate,modern,liquor,fingerprints,enchantment,butters,stuffed,stavros,rome,filed,emotionally,division,conditions,uhm,transplant,tips,passes,oxygen,nicely,lunatic,hid,drill,designs,complain,announcement,visitors,unfortunate,slap,prayers,plug,organization,opens,oath,o'neill,mutual,graduate,confirmed,broad,yacht,spa,remembers,fried,extraordinary,bait,appearance,abuse,warton,sworn,stare,safely,reunion,plot,burst,aha,might've,experiment,dive,commission,cells,aboard,returning,independent,expose,environment,buddies,trusting,smaller,mountains,booze,sweep,sore,scudder,properly,parole,manhattan,effective,ditch,decides,canceled,bra,antonio's,speaks,spanish,reaching,glow,foundation,women's,wears,thirsty,skull,ringing,dorm,dining,bend,unexpected,systems,sob,pancakes,michael's,harsh,flattered,existence,ahhh,troubles,proposed,fights,favourite,eats,driven,computers,rage,luke's,causes,border,undercover,spoiled,sloane,shine,rug,identify,destroying,deputy,deliberately,conspiracy,clothing,thoughtful,similar,sandwiches,plates,nails,miracles,investment,fridge,drank,contrary,beloved,allergic,washed,stalking,solved,sack,misses,hope's,forgiven,erica's,cuz,bent,approval,practical,organized,maciver,involve,industry,fuel,dragging,cooked,possession,pointing,foul,editor,dull,beneath,ages,horror,heels,grass,faking,deaf,stunt,portrait,painted,jealousy,hopeless,fears,cuts,conclusion,volunteer,scenario,satellite,necklace,men's,crashed,chapel,accuse,restraining,jason's,humans,homicide,helicopter,formal,firing,shortly,safer,devoted,auction,videotape,tore,stores,reservations,pops,appetite,anybody's,wounds,vanquish,symbol,prevent,patrol,ironic,flow,fathers,excitement,anyhow,tearing,sends,sam's,rape,laughed,function,core,charmed,whatever's,sub,lucy's,dealer,cooperate,bachelor,accomplish,wakes,struggle,spotted,sorts,reservation,ashes,yards,votes,tastes,supposedly,loft,intentions,integrity,wished,towels,suspected,slightly,qualified,log,investigating,inappropriate,immediate,companies,backed,pan,owned,lipstick,lawn,compassion,cafeteria,belonged,affected,scarf,precisely,obsession,management,loses,lighten,jake's,infection,granddaughter,explode,chemistry,balcony,this'll,storage,spying,publicity,exists,employees,depend,cue,cracked,conscious,aww,ally,ace,accounts,absurd,vicious,tools,strongly,rap,invented,forbid,directions,defendant,bare,announce,alcazar's,screwing,salesman,robbed,leap,lakeview,insanity,injury,genetic,document,why's,reveal,religious,possibilities,kidnap,gown,entering,chairs,wishing,statue,setup,serial,punished,dramatic,dismissed,criminals,seventh,regrets,raped,quarters,produce,lamp,dentist,anyways,anonymous,added,semester,risks,regarding,owes,magazines,machines,lungs,explaining,delicate,child's,tricked,oldest,liv,eager,doomed,cafe,bureau,adoption,traditional,surrender,stab,sickness,scum,loop,independence,generation,floating,envelope,entered,combination,chamber,worn,vault,sorel,pretended,potatoes,plea,photograph,payback,misunderstood,kiddo,healing,cascade,capeside,application,stabbed,remarkable,cabinet,brat,wrestling,sixth,scale,privilege,passionate,nerves,lawsuit,kidney,disturbed,crossing,cozy,associate,tire,shirts,required,posted,oven,ordering,mill,journal,gallery,delay,clubs,risky,nest,monsters,honorable,grounded,favour,culture,closest,brenda's,breakdown,attempted,tony's,placed,conflict,bald,actress,abandon,steam,scar,pole,duh,collar,worthless,standards,resources,photographs,introduced,injured,graduation,enormous,disturbing,disturb,distract,deals,conclusions,vodka,situations,require,mid,measure,dishes,crawling,congress,children's,briefcase,wiped,whistle,sits,roast,rented,pigs,greek,flirting,existed,deposit,damaged,bottles,vanessa's,types,topic,riot,overreacting,minimum,logical,impact,hostile,embarrass,casual,beacon,amusing,altar,values,recognized,maintain,goods,covers,claus,battery,survival,skirt,shave,prisoners,porch,med,ghosts,favors,drops,dizzy,chili,begun,beaten,advise,transferred,strikes,rehab,raw,photographer,peaceful,leery,heavens,fortunately,fooling,expectations,draft,citizens,weakness,ski,ships,ranch,practicing,musical,movement,individual,homes,executed,examine,documents,cranes,column,bribe,task,species,sail,rum,resort,prescription,operating,hush,fragile,forensics,expense,drugged,differences,cows,conduct,comic,bells,avenue,attacking,assigned,visitor,suitcase,sources,sorta,scan,payment,motor,mini,manticore,inspired,insecure,imagining,hardest,clerk,yea,wrist,what'll,tube,starters,silk,pump,pale,nicer,haul,flies,demands,boot,arts,african,there'd,limited,how're,elders,connections,quietly,pulls,idiots,factor,erase,denying,attacks,ankle,amnesia,accepting,ooo,heartbeat,gal,devane,confront,backing,phrase,operations,minus,meets,legitimate,hurricane,fixing,communication,boats,auto,arrogant,supper,studies,slightest,sins,sayin,recipe,pier,paternity,humiliating,genuine,catholic,snack,rational,pointed,minded,guessed,grace's,display,dip,brooke's,advanced,weddings,unh,tumor,teams,reported,humiliated,destruction,copies,closely,bid,aspirin,academy,wig,throughout,spray,occur,logic,eyed,equal,drowning,contacts,shakespeare,ritual,perfume,kelly's,hiring,hating,generally,error,elected,docks,creatures,visions,thanking,thankful,sock,replaced,nineteen,nick's,fork,comedy,analysis,yale,throws,teenagers,studied,stressed,slice,rolls,requires,plead,ladder,kicks,detectives,assured,alison's,widow,tomorrow's,tissue,tellin,shallow,responsibilities,repay,rejected,permanently,girlfriends,deadly,comforting,ceiling,bonus,verdict,maintenance,jar,insensitive,factory,aim,triple,spilled,respected,recovered,messy,interrupted,halliwell,car's,bleed,benefits,wardrobe,takin,significant,objective,murders,doo,chart,backs,workers,waves,underestimate,ties,registered,multiple,justify,harmless,frustrated,fold,enzo,convention,communicate,bugging,attraction,arson,whack,salary,rumors,residence,party's,obligation,medium,liking,laura's,development,develop,dearest,david's,danny's,congratulate,vengeance,switzerland,severe,rack,puzzle,puerto,guidance,fires,courtesy,caller,blamed,tops,repair,quiz,prep,now's,involves,headquarters,curiosity,codes,circles,barbecue,troops,sunnydale,spinning,scores,pursue,psychotic,cough,claimed,accusations,shares,resent,money's,laughs,gathered,freshman,envy,drown,cristian's,bartlet,asses,sofa,scientist,poster,islands,highness,dock,apologies,welfare,victor's,theirs,stat,stall,spots,somewhat,ryan's,realizes,psych,fools,finishing,album,wee,understandable,unable,treats,theatre,succeed,stir,relaxed,makin,inches,gratitude,faithful,bin,accent,zip,witter,wandering,regardless,que,locate,inevitable,gretel,deed,crushed,controlling,taxes,smelled,settlement,robe,poet,opposed,marked,greenlee's,gossip,gambling,determine,cuba,cosmetics,cent,accidents,surprising,stiff,sincere,shield,rushed,resume,reporting,refrigerator,reference,preparing,nightmares,mijo,ignoring,hunch,fog,fireworks,drowned,crown,cooperation,brass,accurate,whispering,sophisticated,religion,luggage,investigate,hike,explore,emotion,creek,crashing,contacted,complications,ceo,acid,shining,rolled,righteous,reconsider,inspiration,goody,geek,frightening,festival,ethics,creeps,courthouse,camping,assistance,affection,vow,smythe,protest,lodge,haircut,forcing,essay,chairman,baked,apologized,vibe,respects,receipt,mami,includes,hats,exclusive,destructive,define,defeat,adore,adopt,voted,tracked,signals,shorts,rory's,reminding,relative,ninth,floors,dough,creations,continues,cancelled,cabot,barrel,adam's,snuck,slight,reporters,rear,pressing,novel,newspapers,magnificent,madame,lazy,glorious,fiancee,candidate,brick,bits,australia,activities,visitation,scholarship,sane,previous,kindness,ivy's,shoulda,rescued,mattress,maria's,lounge,lifted,label,importantly,glove,enterprises,driver's,disappointment,condo,cemetery,beings,admitting,yelled,waving,screech,satisfaction,requested,reads,plants,nun,nailed,described,dedicated,certificate,centuries,annual,worm,tick,resting,primary,polish,marvelous,fuss,funds,defensive,cortlandt,compete,chased,provided,pockets,luckily,lilith,filing,depression,conversations,consideration,consciousness,worlds,innocence,indicate,grandmother's,forehead,bam,appeared,aggressive,trailer,slam,retirement,quitting,pry,person's,narrow,levels,kay's,inform,encourage,dug,delighted,daylight,danced,currently,confidential,billy's,ben's,aunts,washing,vic,tossed,spectra,rick's,permit,marrow,lined,implying,hatred,grill,efforts,corpse,clues,sober,relatives,promotion,offended,morgue,larger,infected,humanity,eww,emily's,electricity,electrical,distraction,cart,broadcast,wired,violation,suspended,promising,harassment,glue,gathering,d'angelo,cursed,controlled,calendar,brutal,assets,warlocks,wagon,unpleasant,proving,priorities,observation,mustn't,lease,grows,flame,domestic,disappearance,depressing,thrill,sitter,ribs,offers,naw,flush,exception,earrings,deadline,corporal,collapsed,update,snapped,smack,orleans,offices,melt,figuring,delusional,coulda,burnt,actors,trips,tender,sperm,specialist,scientific,realise,pork,popped,planes,kev,interrogation,institution,included,esteem,communications,choosing,choir,undo,pres,prayed,plague,manipulate,lifestyle,insulting,honour,detention,delightful,coffeehouse,chess,betrayal,apologizing,adjust,wrecked,wont,whipped,rides,reminder,psychological,principle,monsieur,injuries,fame,faint,confusion,christ's,bon,bake,nearest,korea,industries,execution,distress,definition,creating,correctly,complaint,blocked,trophy,tortured,structure,rot,risking,pointless,household,heir,handing,eighth,dumping,cups,chloe's,alibi,absence,vital,tokyo,thus,struggling,shiny,risked,refer,mummy,mint,joey's,involvement,hose,hobby,fortunate,fleischman,fitting,curtain,counseling,addition,wit,transport,technical,rode,puppet,opportunities,modeling,memo,irresponsible,humiliation,hiya,freakin,fez,felony,choke,blackmailing,appreciated,tabloid,suspicion,recovering,rally,psychology,pledge,panicked,nursery,louder,jeans,investigator,identified,homecoming,helena's,height,graduated,frustrating,fabric,distant,buys,busting,buff,wax,sleeve,products,philosophy,irony,hospitals,dope,declare,autopsy,workin,torch,substitute,scandal,prick,limb,leaf,lady's,hysterical,growth,goddamnit,fetch,dimension,day's,crowded,clip,climbing,bonding,approved,yeh,woah,ultimately,trusts,returns,negotiate,millennium,majority,lethal,length,iced,deeds,bore,babysitter,questioned,outrageous,medal,kiriakis,insulted,grudge,established,driveway,deserted,definite,capture,beep,wires,suggestions,searched,owed,originally,nickname,lighting,lend,drunken,demanding,costanza,conviction,characters,bumped,weigh,touches,tempted,shout,resolve,relate,poisoned,pip,phoebe's,pete's,occasionally,molly's,meals,maker,invitations,haunted,fur,footage,depending,bogus,autograph,affects,tolerate,stepping,spontaneous,sleeps,probation,presentation,performed,manny,identical,fist,cycle,associates,aaron's,streak,spectacular,sector,lasted,isaac's,increase,hostages,heroin,havin,habits,encouraging,cult,consult,burgers,boyfriends,bailed,baggage,association,wealthy,watches,versus,troubled,torturing,teasing,sweetest,stations,sip,shawn's,rag,qualities,postpone,pad,overwhelmed,malkovich,impulse,hut,follows,classy,charging,barbara's,angel's,amazed,scenes,rising,revealed,representing,policeman,offensive,mug,hypocrite,humiliate,hideous,finals,experiences,d'ya,courts,costumes,captured,bluffing,betting,bein,bedtime,alcoholic,vegetable,tray,suspicions,spreading,splendid,shouting,roots,pressed,nooo,liza's,jew,intent,grieving,gladly,fling,eliminate,disorder,courtney's,cereal,arrives,aaah,yum,technique,statements,sonofabitch,servant,roads,republican,paralyzed,orb,lotta,locks,guaranteed,european,dummy,discipline,despise,dental,corporation,carries,briefing,bluff,batteries,atmosphere,whatta,tux,sounding,servants,rifle,presume,kevin's,handwriting,goals,gin,fainted,elements,dried,cape,allright,allowing,acknowledge,whacked,toxic,skating,reliable,quicker,penalty,panel,overwhelming,nearby,lining,importance,harassing,fatal,endless,elsewhere,dolls,convict,bold,ballet,whatcha,unlikely,spiritual,shutting,separation,recording,positively,overcome,goddam,failing,essence,dose,diagnosis,cured,claiming,bully,airline,ahold,yearbook,various,tempting,shelf,rig,pursuit,prosecution,pouring,possessed,partnership,miguel's,lindsay's,countries,wonders,tsk,thorough,spine,rath,psychiatric,meaningless,latte,jammed,ignored,fiance,exposure,exhibit,evidently,duties,contempt,compromised,capacity,cans,weekends,urge,theft,suing,shipment,scissors,responding,refuses,proposition,noises,matching,located,ink,hormones,hiv,hail,grandchildren,godfather,gently,establish,crane's,contracts,compound,buffy's,worldwide,smashed,sexually,sentimental,senor,scored,patient's,nicest,marketing,manipulated,jaw,intern,handcuffs,framed,errands,entertaining,discovery,crib,carriage,barge,awards,attending,ambassador,videos,tab,spends,slipping,seated,rubbing,rely,reject,recommendation,reckon,ratings,headaches,float,embrace,corners,whining,sweating,sole,skipped,restore,receiving,population,pep,mountie,motives,mama's,listens,korean,heroes,heart's,cristobel,controls,cheerleader,balsom,unnecessary,stunning,shipping,scent,santa's,quartermaines,praise,pose,montega,luxury,loosen,kyle's,keri's,info,hum,haunt,gracious,git,forgiving,fleet,errand,emperor,cakes,blames,abortion,worship,theories,strict,sketch,shifts,plotting,physician,perimeter,passage,pals,mere,mattered,lonigan,longest,jews,interference,eyewitness,enthusiasm,encounter,diapers,craig's,artists,strongest,shaken,serves,punched,projects,portal,outer,nazi,hal's,colleagues,catches,bearing,backyard,academic,winds,terrorists,sabotage,pea,organs,needy,mentor,measures,listed,lex,cuff,civilization,caribbean,articles,writes,woof,who'll,viki's,valid,rarely,rabbi,prank,performing,obnoxious,mates,improve,hereby,gabby,faked,cellar,whitelighter,void,substance,strangle,sour,skill,senate,purchase,native,muffins,interfering,hoh,gina's,demonic,colored,clearing,civilian,buildings,boutique,barrington,trading,terrace,smoked,seed,righty,relations,quack,published,preliminary,petey,pact,outstanding,opinions,knot,ketchup,items,examined,disappearing,cordy,coin,circuit,assist,administration,walt,uptight,ticking,terrifying,tease,tabitha's,syd,swamp,secretly,rejection,reflection,realizing,rays,pennsylvania,partly,mentally,marone,jurisdiction,frasier's,doubted,deception,crucial,congressman,cheesy,arrival,visited,supporting,stalling,scouts,scoop,ribbon,reserve,raid,notion,income,immune,grandma's,expects,edition,destined,constitution,classroom,bets,appreciation,appointed,accomplice,whitney's,wander,shoved,sewer,scroll,retire,paintings,lasts,fugitive,freezer,discount,cranky,crank,clearance,bodyguard,anxiety,accountant,abby's,whoops,volunteered,terrorist,tales,talents,stinking,resolved,remotely,protocol,livvie's,garlic,decency,cord,beds,asa's,areas,altogether,uniforms,tremendous,restaurants,rank,profession,popping,philadelphia,outa,observe,lung,largest,hangs,feelin,experts,enforcement,encouraged,economy,dudes,donation,disguise,diane's,curb,continued,competitive,businessman,bites,antique,advertising,ads,toothbrush,retreat,represents,realistic,profits,predict,nora's,lid,landlord,hourglass,hesitate,frank's,focusing,equally,consolation,boyfriend's,babbling,aged,troy's,tipped,stranded,smartest,sabrina's,rhythm,replacement,repeating,puke,psst,paycheck,overreacted,macho,leadership,kendall's,juvenile,john's,images,grocery,freshen,disposal,cuffs,consent,caffeine,arguments,agrees,abigail's,vanished,unfinished,tobacco,tin,syndrome,ripping,pinch,missiles,isolated,flattering,expenses,dinners,cos,colleague,ciao,buh,belthazor,belle's,attorneys,amber's,woulda,whereabouts,wars,waitin,visits,truce,tripped,tee,tasted,stu,steer,ruling,poisoning,nursing,manipulative,immature,husbands,heel,granddad,delivering,deaths,condoms,automatically,anchor,trashed,tournament,throne,raining,prices,pasta,needles,leaning,leaders,judges,ideal,detector,coolest,casting,batch,approximately,appointments,almighty,achieve,vegetables,sum,spark,ruled,revolution,principles,perfection,pains,momma,mole,interviews,initiative,hairs,getaway,employment,den,cracking,counted,compliments,behold,verge,tougher,timer,tapped,taped,stakes,specialty,snooping,shoots,semi,rendezvous,pentagon,passenger,leverage,jeopardize,janitor,grandparents,forbidden,examination,communist,clueless,cities,bidding,arriving,adding,ungrateful,unacceptable,tutor,soviet,shaped,serum,scuse,savings,pub,pajamas,mouths,modest,methods,lure,irrational,depth,cries,classified,bombs,beautifully,arresting,approaching,vessel,variety,traitor,sympathetic,smug,smash,rental,prostitute,premonitions,mild,jumps,inventory,ing,improved,grandfather's,developing,darlin,committing,caleb's,banging,asap,amendment,worms,violated,vent,traumatic,traced,tow,swiss,sweaty,shaft,recommended,overboard,literature,insight,healed,grasp,fluid,experiencing,crappy,crab,connecticut,chunk,chandler's,awww,applied,witnessed,traveled,stain,shack,reacted,pronounce,presented,poured,occupied,moms,marriages,jabez,invested,handful,gob,gag,flipped,fireplace,expertise,embarrassment,disappears,concussion,bruises,brakes,anything's,week's,twisting,tide,swept,summon,splitting,settling,scientists,reschedule,regard,purposes,ohio,notch,mike's,improvement,hooray,grabbing,extend,exquisite,disrespect,complaints,colin's,armor,voting,thornhart,sustained,straw,slapped,simon's,shipped,shattered,ruthless,reva's,refill,recorded,payroll,numb,mourning,marijuana,manly,jerry's,involving,hunk,entertain,earthquake,drift,dreadful,doorstep,confirmation,chops,bridget's,appreciates,announced,vague,tires,stressful,stem,stashed,stash,sensed,preoccupied,predictable,noticing,madly,halls,gunshot,embassy,dozens,dinner's,confuse,cleaners,charade,chalk,cappuccino,breed,bouquet,amulet,addiction,who've,warming,unlock,transition,satisfy,sacrificed,relaxing,lone,input,hampshire,girlfriend's,elaborate,concerning,completed,channels,category,cal,blocking,blend,blankets,america's,addicted,yuck,voters,professionals,positions,monica's,mode,initial,hunger,hamburger,greeting,greet,gravy,gram,dreamt,dice,declared,collecting,caution,brady's,backpack,agreeing,writers,whale,tribe,taller,supervisor,sacrifices,radiation,poo,phew,outcome,ounce,missile,meter,likewise,irrelevant,gran,felon,feature,favorites,farther,fade,experiments,erased,easiest,disk,convenience,conceived,compassionate,challenged,cane,blair's,backstage,agony,adores,veins,tweek,thieves,surgical,strangely,stetson,recital,proposing,productive,meaningful,marching,immunity,hassle,goddamned,frighten,directors,dearly,comments,closure,cease,ambition,wisconsin,unstable,sweetness,salvage,richer,refusing,raging,pumping,pressuring,petition,mortals,lowlife,jus,intimidated,intentionally,inspire,forgave,eric's,devotion,despicable,deciding,dash,comfy,breach,bo's,bark,alternate,aaaah,switching,swallowed,stove,slot,screamed,scars,russians,relevant,poof,pipes,persons,pawn,losses,legit,invest,generations,farewell,experimental,difficulty,curtains,civilized,championship,caviar,boost,token,tends,temporarily,superstition,supernatural,sunk,sadness,reduced,recorder,psyched,presidential,owners,motivated,microwave,lands,karen's,hallelujah,gap,fraternity,engines,dryer,cocoa,chewing,additional,acceptable,unbelievably,survivor,smiled,smelling,sized,simpler,sentenced,respectable,remarks,registration,premises,passengers,organ,occasional,khasinau,indication,gutter,grabs,goo,fulfill,flashlight,ellenor,courses,blooded,blessings,beware,beth's,bands,advised,water's,uhhh,turf,swings,slips,shocking,resistance,privately,olivia's,mirrors,lyrics,locking,instrument,historical,heartless,fras,decades,comparison,childish,cassie's,cardiac,admission,utterly,tuscany,ticked,suspension,stunned,statesville,sadly,resolution,reserved,purely,opponent,noted,lowest,kiddin,jerks,hitch,flirt,fare,extension,establishment,equals,dismiss,delayed,decade,christening,casket,c'mere,breakup,brad's,biting,antibiotics,accusation,abducted,witchcraft,whoever's,traded,thread,spelling,so's,school's,runnin,remaining,punching,protein,printed,paramedics,newest,murdering,mine's,masks,lawndale,intact,ins,initials,heights,grampa,democracy,deceased,colleen's,choking,charms,careless,bushes,buns,bummed,accounting,travels,taylor's,shred,saves,saddle,rethink,regards,references,precinct,persuade,patterns,meds,manipulating,llanfair,leash,kenny's,housing,hearted,guarantees,flown,feast,extent,educated,disgrace,determination,deposition,coverage,corridor,burial,bookstore,boil,abilities,vitals,veil,trespassing,teaches,sidewalk,sensible,punishing,overtime,optimistic,occasions,obsessing,oak,notify,mornin,jeopardy,jaffa,injection,hilarious,distinct,directed,desires,curve,confide,challenging,cautious,alter,yada,wilderness,where're,vindictive,vial,tomb,teeny,subjects,stroll,sittin,scrub,rebuild,rachel's,posters,parallel,ordeal,orbit,o'brien,nuns,max's,jennifer's,intimacy,inheritance,fails,exploded,donate,distracting,despair,democratic,defended,crackers,commercials,bryant's,ammunition,wildwind,virtue,thoroughly,tails,spicy,sketches,sights,sheer,shaving,seize,scarecrow,refreshing,prosecute,possess,platter,phillip's,napkin,misplaced,merchandise,membership,loony,jinx,heroic,frankenstein,fag,efficient,devil's,corps,clan,boundaries,attract,ambitious,virtually,syrup,solitary,resignation,resemblance,reacting,pursuing,premature,pod,liz's,lavery,journalist,honors,harvey's,genes,flashes,erm,contribution,company's,client's,cheque,charts,cargo,awright,acquainted,wrapping,untie,salute,ruins,resign,realised,priceless,partying,myth,moonlight,lightly,lifting,kasnoff,insisting,glowing,generator,flowing,explosives,employer,cutie,confronted,clause,buts,breakthrough,blouse,ballistic,antidote,analyze,allowance,adjourned,vet,unto,understatement,tucked,touchy,toll,subconscious,sequence,screws,sarge,roommates,reaches,rambaldi,programs,offend,nerd,knives,kin,irresistible,inherited,incapable,hostility,goddammit,fuse,frat,equation,curfew,centered,blackmailed,allows,alleged,walkin,transmission,text,starve,sleigh,sarcastic,recess,rebound,procedures,pinned,parlor,outfits,livin,issued,institute,industrial,heartache,head's,haired,fundraiser,doorman,documentary,discreet,dilucca,detect,cracks,cracker,considerate,climbed,catering,author,apophis,zoey,vacuum,urine,tunnels,todd's,tanks,strung,stitches,sordid,sark,referred,protector,portion,phoned,pets,paths,mat,lengths,kindergarten,hostess,flaw,flavor,discharge,deveraux,consumed,confidentiality,automatic,amongst,viktor,victim's,tactics,straightened,specials,spaghetti,soil,prettier,powerless,por,poems,playin,playground,parker's,paranoia,nsa,mainly,mac's,joe's,instantly,havoc,exaggerating,evaluation,eavesdropping,doughnuts,diversion,deepest,cutest,companion,comb,bela,behaving,avoided,anyplace,agh,accessory,zap,whereas,translate,stuffing,speeding,slime,polls,personalities,payments,musician,marital,lurking,lottery,journalism,interior,imaginary,hog,guinea,greetings,game's,fairwinds,ethical,equipped,environmental,elegant,elbow,customs,cuban,credibility,credentials,consistent,collapse,cloth,claws,chopped,challenges,bridal,boards,bedside,babysitting,authorized,assumption,ant,youngest,witty,vast,unforgivable,underworld,tempt,tabs,succeeded,sophomore,selfless,secrecy,runway,restless,programming,professionally,okey,movin,metaphor,messes,meltdown,lecter,incoming,hence,gasoline,gained,funding,episodes,diefenbaker,contain,comedian,collected,cam,buckle,assembly,ancestors,admired,adjustment,acceptance,weekly,warmth,throats,seduced,ridge's,reform,rebecca's,queer,poll,parenting,noses,luckiest,graveyard,gifted,footsteps,dimeras,cynical,assassination,wedded,voyage,volunteers,verbal,unpredictable,tuned,stoop,slides,sinking,show's,rio,rigged,regulations,region,promoted,plumbing,lingerie,layer,katie's,hankey,greed,everwood,essential,elope,dresser,departure,dat,dances,coup,chauffeur,bulletin,bugged,bouncing,website,tubes,temptation,supported,strangest,sorel's,slammed,selection,sarcasm,rib,primitive,platform,pending,partial,packages,orderly,obsessive,nevertheless,nbc,murderers,motto,meteor,inconvenience,glimpse,froze,fiber,execute,etc,ensure,drivers,dispute,damages,crop,courageous,consulate,closes,bosses,bees,amends,wuss,wolfram,wacky,unemployed,traces,town's,testifying,tendency,syringe,symphony,stew,startled,sorrow,sleazy,shaky,screams,rsquo,remark,poke,phone's,philip's,nutty,nobel,mentioning,mend,mayor's,iowa,inspiring,impulsive,housekeeper,germans,formed,foam,fingernails,economic,divide,conditioning,baking,whine,thug,starved,sedative,rose's,reversed,publishing,programmed,picket,paged,nowadays,newman's,mines,margo's,invasion,homosexual,homo,hips,forgets,flipping,flea,flatter,dwell,dumpster,consultant,choo,banking,assignments,apartments,ants,affecting,advisor,vile,unreasonable,tossing,thanked,steals,souvenir,screening,scratched,rep,psychopath,proportion,outs,operative,obstruction,obey,neutral,lump,lily's,insists,ian's,harass,gloat,flights,filth,extended,electronic,edgy,diseases,didn,coroner,confessing,cologne,cedar,bruise,betraying,bailing,attempting,appealing,adebisi,wrath,wandered,waist,vain,traps,transportation,stepfather,publicly,presidents,poking,obligated,marshal,lexie's,instructed,heavenly,halt,employed,diplomatic,dilemma,crazed,contagious,coaster,cheering,carved,bundle,approached,appearances,vomit,thingy,stadium,speeches,robbing,reflect,raft,qualify,pumped,pillows,peep,pageant,packs,neo,neglected,m'kay,loneliness,liberal,intrude,indicates,helluva,gardener,freely,forresters,err,drooling,continuing,betcha,alan's,addressed,acquired,vase,supermarket,squat,spitting,spaces,slaves,rhyme,relieve,receipts,racket,purchased,preserve,pictured,pause,overdue,officials,nod,motivation,morgendorffer,lucky's,lacking,kidnapper,introduction,insect,hunters,horns,feminine,eyeballs,dumps,disc,disappointing,difficulties,crock,convertible,context,claw,clamp,canned,cambias,bathtub,avanya,artery,weep,warmer,vendetta,tenth,suspense,summoned,stuff's,spiders,sings,reiber,raving,pushy,produced,poverty,postponed,ohhhh,noooo,mold,mice,laughter,incompetent,hugging,groceries,frequency,fastest,drip,differ,daphne's,communicating,body's,beliefs,bats,bases,auntie,adios,wraps,willingly,weirdest,voila,timmih,thinner,swelling,swat,steroids,sensitivity,scrape,rehearse,quarterback,organic,matched,ledge,justified,insults,increased,heavily,hateful,handles,feared,doorway,decorations,colour,chatting,buyer,buckaroo,bedrooms,batting,askin,ammo,tutoring,subpoena,span,scratching,requests,privileges,pager,mart,kel,intriguing,idiotic,hotels,grape,enlighten,dum,door's,dixie's,demonstrate,dairy,corrupt,combined,brunch,bridesmaid,barking,architect,applause,alongside,ale,acquaintance,yuh,wretched,superficial,sufficient,sued,soak,smoothly,sensing,restraint,quo,pow,posing,pleading,pittsburgh,peru,payoff,participate,organize,oprah,nemo,morals,loans,loaf,lists,laboratory,jumpy,intervention,ignorant,herbal,hangin,germs,generosity,flashing,country's,convent,clumsy,chocolates,captive,bianca's,behaved,apologise,vanity,trials,stumbled,republicans,represented,recognition,preview,poisonous,perjury,parental,onboard,mugged,minding,linen,learns,knots,interviewing,inmates,ingredients,humour,grind,greasy,goons,estimate,elementary,edmund's,drastic,database,coop,comparing,cocky,clearer,bruised,brag,bind,axe,asset,apparent,ann's,worthwhile,whoop,wedding's,vanquishing,tabloids,survivors,stenbeck's,sprung,spotlight,shops,sentencing,sentences,revealing,reduce,ram,racist,provoke,piper's,pining,overly,oui,ops,mop,louisiana,locket,king's,jab,imply,impatient,hovering,hotter,fest,endure,dots,doren,dim,diagnosed,debts,cultures,crawled,contained,condemned,chained,brit,breaths,adds,weirdo,warmed,wand,utah,troubling,tok'ra,stripped,strapped,soaked,skipping,sharon's,scrambled,rattle,profound,musta,mocking,mnh,misunderstand,merit,loading,linked,limousine,kacl,investors,interviewed,hustle,forensic,foods,enthusiastic,duct,drawers,devastating,democrats,conquer,concentration,comeback,clarify,chores,cheerleaders,cheaper,charlie's,callin,blushing,barging,abused,yoga,wrecking,wits,waffles,virginity,vibes,uninvited,unfaithful,underwater,tribute,strangled,state's,scheming,ropes,responded,residents,rescuing,rave,priests,postcard,overseas,orientation,ongoing,o'reily,newly,neil's,morphine,lotion,limitations,lesser,lectures,lads,kidneys,judgement,jog,itch,intellectual,installed,infant,indefinitely,grenade,glamorous,genetically,freud,faculty,engineering,doh,discretion,delusions,declaration,crate,competent,commonwealth,catalog,bakery,attempts,asylum,argh,applying,ahhhh,yesterday's,wedge,wager,unfit,tripping,treatments,torment,superhero,stirring,spinal,sorority,seminar,scenery,repairs,rabble,pneumonia,perks,owl,override,ooooh,moo,mija,manslaughter,mailed,love's,lime,lettuce,intimidate,instructor,guarded,grieve,grad,globe,frustration,extensive,exploring,exercises,eve's,doorbell,devices,deal's,dam,cultural,ctu,credits,commerce,chinatown,chemicals,baltimore,authentic,arraignment,annulled,altered,allergies,wanta,verify,vegetarian,tunes,tourist,tighter,telegram,suitable,stalk,specimen,spared,solving,shoo,satisfying,saddam,requesting,publisher,pens,overprotective,obstacles,notified,negro,nasedo,judged,jill's,identification,grandchild,genuinely,founded,flushed,fluids,floss,escaping,ditched,demon's,decorated,criticism,cramp,corny,contribute,connecting,bunk,bombing,bitten,billions,bankrupt,yikes,wrists,ultrasound,ultimatum,thirst,spelled,sniff,scope,ross's,room's,retrieve,releasing,reassuring,pumps,properties,predicted,neurotic,negotiating,needn't,multi,monitors,millionaire,microphone,mechanical,lydecker,limp,incriminating,hatchet,gracias,gordie,fills,feeds,egypt,doubting,dedication,decaf,dawson's,competing,cellular,biopsy,whiz,voluntarily,visible,ventilator,unpack,unload,universal,tomatoes,targets,suggests,strawberry,spooked,snitch,schillinger,sap,reassure,providing,prey,pressure's,persuasive,mystical,mysteries,mri,moment's,mixing,matrimony,mary's,mails,lighthouse,liability,kgb,jock,headline,frankie's,factors,explosive,explanations,dispatch,detailed,curly,cupid,condolences,comrade,cassadines,bulb,brittany's,bragging,awaits,assaulted,ambush,adolescent,adjusted,abort,yank,whit,verse,vaguely,undermine,tying,trim,swamped,stitch,stan's,stabbing,slippers,skye's,sincerely,sigh,setback,secondly,rotting,rev,retail,proceedings,preparation,precaution,pox,pcpd,nonetheless,melting,materials,mar,liaison,hots,hooking,headlines,hag,ganz,fury,felicity,fangs,expelled,encouragement,earring,dreidel,draws,dory,donut,dog's,dis,dictate,dependent,decorating,coordinates,cocktails,bumps,blueberry,believable,backfired,backfire,apron,anticipated,adjusting,activated,vous,vouch,vitamins,vista,urn,uncertain,ummm,tourists,tattoos,surrounding,sponsor,slimy,singles,sibling,shhhh,restored,representative,renting,reign,publish,planets,peculiar,parasite,paddington,noo,marries,mailbox,magically,lovebirds,listeners,knocks,kane's,informant,grain,exits,elf,drazen,distractions,disconnected,dinosaurs,designing,dashwood,crooked,conveniently,contents,argued,wink,warped,underestimated,testified,tacky,substantial,steve's,steering,staged,stability,shoving,seizure,reset,repeatedly,radius,pushes,pitching,pairs,opener,mornings,mississippi,matthew's,mash,investigations,invent,indulge,horribly,hallucinating,festive,eyebrows,expand,enjoys,dictionary,dialogue,desperation,dealers,darkest,daph,critic,consulting,cartman's,canal,boragora,belts,bagel,authorization,auditions,associated,ape,amy's,agitated,adventures,withdraw,wishful,wimp,vehicles,vanish,unbearable,tonic,tom's,tackle,suffice,suction,slaying,singapore,safest,rosanna's,rocking,relive,rates,puttin,prettiest,oval,noisy,newlyweds,nauseous,moi,misguided,mildly,midst,maps,liable,kristina's,judgmental,introducing,individuals,hunted,hen,givin,frequent,fisherman,fascinated,elephants,dislike,diploma,deluded,decorate,crummy,contractions,carve,careers,bottled,bonded,bahamas,unavailable,twenties,trustworthy,translation,traditions,surviving,surgeons,stupidity,skies,secured,salvation,remorse,rafe's,princeton,preferably,pies,photography,operational,nuh,northwest,nausea,napkins,mule,mourn,melted,mechanism,mashed,julia's,inherit,holdings,hel,greatness,golly,excused,edges,dumbo,drifting,delirious,damaging,cubicle,compelled,comm,colleges,cole's,chooses,checkup,chad's,certified,candidates,boredom,bob's,bandages,baldwin's,bah,automobile,athletic,alarms,absorbed,absent,windshield,who're,whaddya,vitamin,transparent,surprisingly,sunglasses,starring,slit,sided,schemes,roar,relatively,reade,quarry,prosecutor,prognosis,probe,potentially,pitiful,persistent,perception,percentage,peas,oww,nosy,neighbourhood,nagging,morons,molecular,meters,masterpiece,martinis,limbo,liars,jax's,irritating,inclined,hump,hoynes,haw,gauge,functions,fiasco,educational,eatin,donated,destination,dense,cubans,continent,concentrating,commanding,colorful,clam,cider,brochure,behaviour,barto,bargaining,awe,artistic,welcoming,weighing,villain,vein,vanquished,striking,stains,sooo,smear,sire,simone's,secondary,roughly,rituals,resentment,psychologist,preferred,pint,pension,passive,overhear,origin,orchestra,negotiations,mounted,morality,landingham,labs,kisser,jackson's,icy,hoot,holling,handshake,grilled,functioning,formality,elevators,edward's,depths,confirms,civilians,bypass,briefly,boathouse,binding,acres,accidental,westbridge,wacko,ulterior,transferring,tis,thugs,tangled,stirred,stefano's,sought,snag,smallest,sling,sleaze,seeds,rumour,ripe,remarried,reluctant,regularly,puddle,promote,precise,popularity,pins,perceptive,miraculous,memorable,maternal,lucinda's,longing,lockup,locals,librarian,job's,inspection,impressions,immoral,hypothetically,guarding,gourmet,gabe,fighters,fees,features,faxed,extortion,expressed,essentially,downright,digest,der,crosses,cranberry,city's,chorus,casualties,bygones,buzzing,burying,bikes,attended,allah,all's,weary,viewing,viewers,transmitter,taping,takeout,sweeping,stepmother,stating,stale,seating,seaborn,resigned,rating,prue's,pros,pepperoni,ownership,occurs,nicole's,newborn,merger,mandatory,malcolm's,ludicrous,jan's,injected,holden's,henry's,heating,geeks,forged,faults,expressing,eddie's,drue,dire,dief,desi,deceiving,centre,celebrities,caterer,calmed,businesses,budge,ashley's,applications,ankles,vending,typing,tribbiani,there're,squared,speculation,snowing,shades,sexist,scudder's,scattered,sanctuary,rewrite,regretted,regain,raises,processing,picky,orphan,mural,misjudged,miscarriage,memorize,marshall's,mark's,licensed,lens,leaking,launched,larry's,languages,judge's,jitters,invade,interruption,implied,illegally,handicapped,glitch,gittes,finer,fewer,engineered,distraught,dispose,dishonest,digs,dahlia's,dads,cruelty,conducting,clinical,circling,champions,canceling,butterflies,belongings,barbrady,amusement,allegations,alias,aging,zombies,where've,unborn,tri,swearing,stables,squeezed,spaulding's,slavery,sew,sensational,revolutionary,resisting,removing,radioactive,races,questionable,privileged,portofino,par,owning,overlook,overhead,orson,oddly,nazis,musicians,interrogate,instruments,imperative,impeccable,icu,hurtful,hors,heap,harley's,graduating,graders,glance,endangered,disgust,devious,destruct,demonstration,creates,crazier,countdown,coffee's,chump,cheeseburger,cat's,burglar,brotherhood,berries,ballroom,assumptions,ark,annoyed,allies,allergy,advantages,admirer,admirable,addresses,activate,accompany,wed,victoria's,valve,underpants,twit,triggered,teacher's,tack,strokes,stool,starr's,sham,seasons,sculpture,scrap,sailed,retarded,resourceful,remarkably,refresh,ranks,pressured,precautions,pointy,obligations,nightclub,mustache,month's,minority,mind's,maui,lace,isabella's,improving,iii,hunh,hubby,flare,fierce,farmers,dont,dokey,divided,demise,demanded,dangerously,crushing,considerable,complained,clinging,choked,chem,cheerleading,checkbook,cashmere,calmly,blush,believer,aspect,amazingly,alas,acute,a's,yak,whores,what've,tuition,trey's,tolerance,toilets,tactical,tacos,stairwell,spur,spirited,slower,sewing,separately,rubbed,restricted,punches,protects,partially,ole,nuisance,niagara,motherfuckers,mingle,mia's,kynaston,knack,kinkle,impose,hosting,harry's,gullible,grid,godmother,funniest,friggin,folding,financially,filming,fashions,eater,dysfunctional,drool,distinguished,defence,defeated,cruising,crude,criticize,corruption,contractor,conceive,clone,circulation,cedars,caliber,brighter,blinded,birthdays,bio,bill's,banquet,artificial,anticipate,annoy,achievement,whim,whichever,volatile,veto,vested,uncle's,supports,successfully,shroud,severely,rests,representation,quarantine,premiere,pleases,parent's,painless,pads,orphans,orphanage,offence,obliged,nip,niggers,negotiation,narcotics,nag,mistletoe,meddling,manifest,lookit,loo,lilah,investigated,intrigued,injustice,homicidal,hayward's,gigantic,exposing,elves,disturbance,disastrous,depended,demented,correction,cooped,colby's,cheerful,buyers,brownies,beverage,basics,attorney's,atm,arvin,arcade,weighs,upsets,unethical,tidy,swollen,sweaters,swap,stupidest,sensation,scalpel,rail,prototype,props,prescribed,pompous,poetic,ploy,paws,operates,objections,mushrooms,mulwray,monitoring,manipulation,lured,lays,lasting,kung,keg,jell,internship,insignificant,inmate,incentive,gandhi,fulfilled,flooded,expedition,evolution,discharged,disagreement,dine,dean's,crypt,coroner's,cornered,copied,confrontation,cds,catalogue,brightest,beethoven,banned,attendant,athlete,amaze,airlines,yogurt,wyndemere,wool,vocabulary,vcr,tulsa,tags,tactic,stuffy,slug,sexuality,seniors,segment,revelation,respirator,pulp,prop,producing,processed,pretends,polygraph,perp,pennies,ordinarily,opposition,olives,necks,morally,martyr,martial,lisa's,leftovers,joints,jimmy's,irs,invaded,imported,hopping,homey,hints,helicopters,heed,heated,heartbroken,gulf,greatly,forge,florist,firsthand,fiend,expanding,emma's,defenses,crippled,cousin's,corrected,conniving,conditioner,clears,chemo,bubbly,bladder,beeper,baptism,apb,answer's,anna's,angles,ache,womb,wiring,wench,weaknesses,volunteering,violating,unlocked,unemployment,tummy,tibet,threshold,surrogate,submarine,subid,stray,stated,startle,specifics,snob,slowing,sled,scoot,robbers,rightful,richest,quid,qfxmjrie,puffs,probable,pitched,pierced,pencils,paralysis,nuke,managing,makeover,luncheon,lords,linksynergy,jury's,jacuzzi,ish,interstate,hitched,historic,hangover,gasp,fracture,flock,firemen,drawings,disgusted,darned,coal,clams,chez,cables,broadcasting,brew,borrowing,banged,achieved,wildest,weirder,unauthorized,stunts,sleeves,sixties,shush,shalt,senora,rises,retro,quits,pupils,politicians,pegged,painfully,paging,outlet,omelet,observed,ned's,memorized,lawfully,jackets,interpretation,intercept,ingredient,grownup,glued,gaining,fulfilling,flee,enchanted,dvd,delusion,daring,conservative,conducted,compelling,charitable,carton,bronx,bridesmaids,bribed,boiling,bathrooms,bandage,awareness,awaiting,assign,arrogance,antiques,ainsley,turkeys,travelling,trashing,tic,takeover,sync,supervision,stockings,stalked,stabilized,spacecraft,slob,skates,sirs,sedated,robes,reviews,respecting,rat's,psyche,prominent,prizes,presumptuous,prejudice,platoon,permitted,paragraph,mush,mum's,movements,mist,missions,mints,mating,mantan,lorne,lord's,loads,listener,legendary,itinerary,hugs,hepatitis,heave,guesses,gender,flags,fading,exams,examining,elizabeth's,egyptian,dumbest,dishwasher,dimera's,describing,deceive,cunning,cripple,cove,convictions,congressional,confided,compulsive,compromising,burglary,bun,bumpy,brainwashed,benes,arnie,alvy,affirmative,adrenaline,adamant,watchin,waitresses,uncommon,treaty,transgenic,toughest,toby's,surround,stormed,spree,spilling,spectacle,soaking,significance,shreds,sewers,severed,scarce,scamming,scalp,sami's,salem's,rewind,rehearsing,pretentious,potions,possessions,planner,placing,periods,overrated,obstacle,notices,nerds,meems,medieval,mcmurphy,maturity,maternity,masses,maneuver,lyin,loathe,lawyer's,irv,investigators,hep,grin,gospel,gals,formation,fertility,facilities,exterior,epidemic,eloping,ecstatic,ecstasy,duly,divorcing,distribution,dignan,debut,costing,coaching,clubhouse,clot,clocks,classical,candid,bursting,breather,braces,bennett's,bending,australian,attendance,arsonist,applies,adored,accepts,absorb,vacant,uuh,uphold,unarmed,turd,topolsky,thrilling,thigh,terminate,tempo,sustain,spaceship,snore,sneeze,smuggling,shrine,sera,scott's,salty,salon,ramp,quaint,prostitution,prof,policies,patronize,patio,nasa,morbid,marlo's,mamma,locations,licence,kettle,joyous,invincible,interpret,insecurities,insects,inquiry,infamous,impulses,illusions,holed,glen's,fragments,forrester's,exploit,economics,drivin,des,defy,defenseless,dedicate,cradle,cpr,coupon,countless,conjure,confined,celebrated,cardboard,booking,blur,bleach,ban,backseat,austin's,alternatives,afterward,accomplishment,wordsworth,wisely,wildlife,valet,vaccine,urges,unnatural,unlucky,truths,traumatized,tit,tennessee,tasting,swears,strawberries,steaks,stats,skank,seducing,secretive,screwdriver,schedules,rooting,rightfully,rattled,qualifies,puppets,provides,prospects,pronto,prevented,powered,posse,poorly,polling,pedestal,palms,muddy,morty,miniature,microscope,merci,margin,lecturing,inject,incriminate,hygiene,hospital's,grapefruit,gazebo,funnier,freight,flooding,equivalent,eliminated,elaine's,dios,deacon's,cuter,continental,container,cons,compensation,clap,cbs,cavity,caves,capricorn,canvas,calculations,bossy,booby,bacteria,aides,zende,winthrop,wider,warrants,valentines,undressed,underage,truthfully,tampered,suffers,stored,statute,speechless,sparkling,sod,socially,sidelines,shrek,sank,roy's,raul's,railing,puberty,practices,pesky,parachute,outrage,outdoors,operated,openly,nominated,motions,moods,lunches,litter,kidnappers,itching,intuition,index,imitation,icky,humility,hassling,gallons,firmly,excessive,evolved,employ,eligible,elections,elderly,drugstore,dosage,disrupt,directing,dipping,deranged,debating,cuckoo,cremated,craziness,cooperating,compatible,circumstantial,chimney,bonnie's,blinking,biscuits,belgium,arise,analyzed,admiring,acquire,accounted,willow's,weeping,volumes,views,triad,trashy,transaction,tilt,soothing,slumber,slayers,skirts,siren,ship's,shindig,sentiment,sally's,rosco,riddance,rewarded,quaid,purity,proceeding,pretzels,practiced,politician,polar,panicking,overall,occupation,naming,minimal,mckechnie,massacre,marah's,lovin,leaked,layers,isolation,intruding,impersonating,ignorance,hoop,hamburgers,gwen's,fruits,footprints,fluke,fleas,festivities,fences,feisty,evacuate,emergencies,diabetes,detained,democrat,deceived,creeping,craziest,corpses,conned,coincidences,charleston,bums,brussels,bounced,bodyguards,blasted,bitterness,baloney,ashtray,apocalypse,advances,zillion,watergate,wallpaper,viable,tory's,tenants,telesave,sympathize,sweeter,swam,sup,startin,stages,spencer's,sodas,snowed,sleepover,signor,seein,reviewing,reunited,retainer,restroom,rested,replacing,repercussions,reliving,reef,reconciliation,reconcile,recognise,prevail,preaching,planting,overreact,oof,omen,o'neil,numerous,noose,moustache,morning's,manicure,maids,mah,lorelei's,landlady,hypothetical,hopped,homesick,hives,hesitation,herbs,hectic,heartbreak,haunting,gangs,frown,fingerprint,extract,expired,exhausting,exchanged,exceptional,everytime,encountered,disregard,daytime,cooperative,constitutional,cling,chevron,chaperone,buenos,blinding,bitty,beads,battling,badgering,anticipation,advocate,zander's,waterfront,upstanding,unprofessional,unity,unhealthy,undead,turmoil,truthful,toothpaste,tippin,thoughtless,tagataya,stretching,strategic,spun,shortage,shooters,sheriff's,shady,senseless,sailors,rewarding,refuge,rapid,rah,pun,propane,pronounced,preposterous,pottery,portable,pigeons,pastry,overhearing,ogre,obscene,novels,negotiable,mtv,morgan's,monthly,loner,leisure,leagues,jogging,jaws,itchy,insinuating,insides,induced,immigration,hospitality,hormone,hilda's,hearst,grandpa's,frequently,forthcoming,fists,fifties,etiquette,endings,elevated,editing,dunk,distinction,disabled,dibs,destroys,despises,desired,designers,deprived,dancers,dah,cuddy,crust,conductor,communists,cloak,circumstance,chewed,casserole,bora,bidder,bearer,assessment,artoo,applaud,appalling,amounts,admissions,withdrawal,weights,vowed,virgins,vigilante,vatican,undone,trench,touchdown,throttle,thaw,tha,testosterone,tailor,symptom,swoop,suited,suitcases,stomp,sticker,stakeout,spoiling,snatched,smoochy,smitten,shameless,restraints,researching,renew,relay,regional,refund,reclaim,rapids,raoul,rags,puzzles,purposely,punks,prosecuted,plaid,pineapple,picturing,pickin,pbs,parasites,offspring,nyah,mysteriously,multiply,mineral,masculine,mascara,laps,kramer's,jukebox,interruptions,hoax,gunfire,gays,furnace,exceptions,engraved,elbows,duplicate,drapes,designated,deliberate,deli,decoy,cub,cryptic,crowds,critics,coupla,convert,conventional,condemn,complicate,combine,colossal,clerks,clarity,cassadine's,byes,brushed,bride's,banished,arrests,argon,andy's,alarmed,worships,versa,uncanny,troop,treasury,transformation,terminated,telescope,technicality,sydney's,sundae,stumble,stripping,shuts,separating,schmuck,saliva,robber,retain,remained,relentless,reconnect,recipes,rearrange,ray's,rainy,psychiatrists,producers,policemen,plunge,plugged,patched,overload,ofc,obtained,obsolete,o'malley,numbered,number's,nay,moth,module,mkay,mindless,menus,lullaby,lotte,leavin,layout,knob,killin,karinsky,irregular,invalid,hides,grownups,griff,flaws,flashy,flaming,fettes,evicted,epic,encoded,dread,dil,degrassi,dealings,dangers,cushion,console,concluded,casey's,bowel,beginnings,barged,apes,announcing,amanda's,admits,abroad,abide,abandoning,workshop,wonderfully,woak,warfare,wait'll,wad,violate,turkish,tim's,ter,targeted,susan's,suicidal,stayin,sorted,slamming,sketchy,shoplifting,shapes,selected,sarah's,retiring,raiser,quizmaster,pursued,pupkin,profitable,prefers,politically,phenomenon,palmer's,olympics,needless,nature's,mutt,motherhood,momentarily,migraine,lizzie's,lilo,lifts,leukemia,leftover,law's,keepin,idol,hinks,hellhole,h'mm,gowns,goodies,gallon,futures,friction,finale,farms,extraction,entertained,electronics,eighties,earth's,dmv,darker,daniel's,cum,conspiring,consequence,cheery,caps,calf,cadet,builds,benign,barney's,aspects,artillery,apiece,allison's,aggression,adjustments,abusive,abduction,wiping,whipping,welles,unspeakable,unlimited,unidentified,trivial,transcripts,threatens,textbook,tenant,supervise,superstitious,stricken,stretched,story's,stimulating,steep,statistics,spielberg,sodium,slices,shelves,scratches,saudi,sabotaged,roxy's,retrieval,repressed,relation,rejecting,quickie,promoting,ponies,peeking,paw,paolo,outraged,observer,o'connell,moping,moaning,mausoleum,males,licked,kovich,klutz,iraq,interrogating,interfered,intensive,insulin,infested,incompetence,hyper,horrified,handedly,hacked,guiding,glamour,geoff,gekko,fraid,fractured,formerly,flour,firearms,fend,executives,examiner,evaluate,eloped,duke's,disoriented,delivers,dashing,crystals,crossroads,crashdown,court's,conclude,coffees,cockroach,climate,chipped,camps,brushing,boulevard,bombed,bolts,begs,baths,baptized,astronaut,assurance,anemia,allegiance,aiming,abuela,abiding,workplace,withholding,weave,wearin,weaker,warnings,usa,tours,thesis,terrorism,suffocating,straws,straightforward,stench,steamed,starboard,sideways,shrinks,shortcut,sean's,scram,roasted,roaming,riviera,respectfully,repulsive,recognizes,receiver,psychiatry,provoked,penitentiary,peed,pas,painkillers,oink,norm,ninotchka,muslim,montgomery's,mitzvah,milligrams,mil,midge,marshmallows,markets,macy's,looky,lapse,kubelik,knit,jeb,investments,intellect,improvise,implant,hometown,hanged,handicap,halo,governor's,goa'ulds,giddy,gia's,geniuses,fruitcake,footing,flop,findings,fightin,fib,editorial,drinkin,doork,discovering,detour,danish,cuddle,crashes,coordinate,combo,colonnade,collector,cheats,cetera,canadians,bip,bailiff,auditioning,assed,amused,alienate,algebra,alexi,aiding,aching,woe,wah,unwanted,typically,tug,topless,tongues,tiniest,them's,symbols,superiors,soy,soften,sheldrake,sensors,seller,seas,ruler,rival,rips,renowned,recruiting,reasoning,rawley,raisins,racial,presses,preservation,portfolio,oversight,organizing,obtain,observing,nessa,narrowed,minions,midwest,meth,merciful,manages,magistrate,lawsuits,labour,invention,intimidating,infirmary,indicated,inconvenient,imposter,hugged,honoring,holdin,hades,godforsaken,fumes,forgery,foremost,foolproof,folder,folded,flattery,fingertips,financing,fifteenth,exterminator,explodes,eccentric,drained,dodging,documented,disguised,developments,currency,crafts,constructive,concealed,compartment,chute,chinpokomon,captains,capitol,calculated,buses,bodily,astronauts,alimony,accustomed,accessories,abdominal,zen,zach's,wrinkle,wallow,viv,vicinity,venue,valued,valium,valerie's,upgrade,upcoming,untrue,uncover,twig,twelfth,trembling,treasures,torched,toenails,timed,termites,telly,taunting,taransky,tar,talker,succubus,statues,smarts,sliding,sizes,sighting,semen,seizures,scarred,savvy,sauna,saddest,sacrificing,rubbish,riled,ricky's,rican,revive,recruit,ratted,rationally,provenance,professors,prestigious,pms,phonse,perky,pedal,overdose,organism,nasal,nanites,mushy,movers,moot,missus,midterm,merits,melodramatic,manure,magnetic,knockout,knitting,jig,invading,interpol,incapacitated,idle,hotline,horse's,highlight,hauling,hair's,gunpoint,greenwich,grail,ganza,framing,formally,fleeing,flap,flannel,fin,fibers,faded,existing,email,eavesdrop,dwelling,dwarf,donations,detected,desserts,dar,corporations,constellation,collision,chic,calories,businessmen,buchanan's,breathtaking,bleak,blacked,batter,balanced,ante,aggravated,agencies,abu,yanked,wuh,withdrawn,wigand,whoah,wham,vocal,unwind,undoubtedly,unattractive,twitch,trimester,torrance,timetable,taxpayers,strained,stationed,stared,slapping,sincerity,signatures,siding,siblings,shit's,shenanigans,shacking,seer,satellites,sappy,samaritan,rune,regained,rebellion,proceeds,privy,power's,poorer,politely,paste,oysters,overruled,olaf,nightcap,networks,necessity,mosquito,millimeter,michelle's,merrier,massachusetts,manuscript,manufacture,manhood,lunar,lug,lucked,loaned,kilos,ignition,hurl,hauled,harmed,goodwill,freshmen,forming,fenmore,fasten,farce,failures,exploding,erratic,elm,drunks,ditching,d'artagnan,crops,cramped,contacting,coalition,closets,clientele,chimp,cavalry,casa,cabs,bled,bargained,arranging,archives,anesthesia,amuse,altering,afternoons,accountable,abetting,wrinkles,wolek,waved,unite,uneasy,unaware,ufo,toot,toddy,tens,tattooed,tad's,sway,stained,spauldings,solely,sliced,sirens,schibetta,scatter,rumours,roger's,robbie's,rinse,remo,remedy,redemption,queen's,progressive,pleasures,picture's,philosopher,pacey's,optimism,oblige,natives,muy,measuring,measured,masked,mascot,malicious,mailing,luca,lifelong,kosher,koji,kiddies,judas,isolate,intercepted,insecurity,initially,inferior,incidentally,ifs,hun,heals,headlights,guided,growl,grilling,glazed,gem,gel,gaps,fundamental,flunk,floats,fiery,fairness,exercising,excellency,evenings,ere,enrolled,disclosure,det,department's,damp,curling,cupboard,counterfeit,cooling,condescending,conclusive,clicked,cleans,cholesterol,chap,cashed,brow,broccoli,brats,blueprints,blindfold,biz,billing,barracks,attach,aquarium,appalled,altitude,alrighty,aimed,yawn,xander's,wynant,winslow's,welcomed,violations,upright,unsolved,unreliable,toots,tighten,symbolic,sweatshirt,steinbrenner,steamy,spouse,sox,sonogram,slowed,slots,sleepless,skeleton,shines,roles,retaliate,representatives,rephrase,repeated,renaissance,redeem,rapidly,rambling,quilt,quarrel,prying,proverbial,priced,presiding,presidency,prescribe,prepped,pranks,possessive,plaintiff,philosophical,pest,persuaded,perk,pediatrics,paige's,overlooked,outcast,oop,odor,notorious,nightgown,mythology,mumbo,monitored,mediocre,master's,mademoiselle,lunchtime,lifesaver,legislation,leaned,lambs,lag,killings,interns,intensity,increasing,identities,hounding,hem,hellmouth,goon,goner,ghoul,germ,gardening,frenzy,foyer,food's,extras,extinct,exhibition,exaggerate,everlasting,enlightened,drilling,doubles,digits,dialed,devote,defined,deceitful,d'oeuvres,csi,cosmetic,contaminated,conspired,conning,colonies,cerebral,cavern,cathedral,carving,butting,boiled,blurry,beams,barf,babysit,assistants,ascension,architecture,approaches,albums,albanian,aaaaah,wildly,whoopee,whiny,weiskopf,walkie,vultures,veteran,vacations,upfront,unresolved,tile,tampering,struggled,stockholders,specially,snaps,sleepwalking,shrunk,sermon,seeks,seduction,scenarios,scams,ridden,revolve,repaired,regulation,reasonably,reactor,quotes,preserved,phenomenal,patrolling,paranormal,ounces,omigod,offs,nonstop,nightfall,nat,militia,meeting's,logs,lineup,libby's,lava,lashing,labels,kilometers,kate's,invites,investigative,innocents,infierno,incision,import,implications,humming,highlights,haunts,greeks,gloss,gloating,general's,frannie,flute,fled,fitted,finishes,fiji,fetal,feeny,entrapment,edit,dyin,download,discomfort,dimensions,detonator,dependable,deke,decree,dax,cot,confiscated,concludes,concede,complication,commotion,commence,chulak,caucasian,casually,canary,brainer,bolie,ballpark,arm's,anwar,anatomy,analyzing,accommodations,yukon,youse,wring,wharf,wallowing,uranium,unclear,treason,transgenics,thrive,think's,thermal,territories,tedious,survives,stylish,strippers,sterile,squeezing,squeaky,sprained,solemn,snoring,sic,shifting,shattering,shabby,seams,scrawny,rotation,risen,revoked,residue,reeks,recite,reap,ranting,quoting,primal,pressures,predicament,precision,plugs,pits,pinpoint,petrified,petite,persona,pathological,passports,oughtta,nods,nighter,navigate,nashville,namely,museums,morale,milwaukee,meditation,mathematics,martin's,malta,logan's,latter,kippie,jackie's,intrigue,intentional,insufferable,incomplete,inability,imprisoned,hup,hunky,how've,horrifying,hearty,headmaster,hath,har,hank's,handbook,hamptons,grazie,goof,george's,funerals,fuck's,fraction,forks,finances,fetched,excruciating,enjoyable,enhanced,enhance,endanger,efficiency,dumber,drying,diabolical,destroyer,desirable,defendants,debris,darts,cuisine,cucumber,cube,crossword,contestant,considers,comprehend,club's,clipped,classmates,choppers,certificates,carmen's,canoe,candlelight,building's,brutally,brutality,boarded,bathrobe,backward,authorize,audrey's,atom,assemble,appeals,airports,aerobics,ado,abbott's,wholesome,whiff,vessels,vermin,varsity,trophies,trait,tragically,toying,titles,tissues,testy,team's,tasteful,surge,sun's,studios,strips,stocked,stephen's,staircase,squares,spinach,sow,southwest,southeast,sookie's,slayer's,sipping,singers,sidetracked,seldom,scrubbing,scraping,sanctity,russell's,ruse,robberies,rink,ridin,retribution,reinstated,refrain,rec,realities,readings,radiant,protesting,projector,posed,plutonium,plaque,pilar's,payin,parting,pans,o'reilly,nooooo,motorcycles,motherfucking,mein,measly,marv,manic,line's,lice,liam,lenses,lama,lalita,juggling,jerking,jamie's,intro,inevitably,imprisonment,hypnosis,huddle,horrendous,hobbies,heavier,heartfelt,harlin,hairdresser,grub,gramps,gonorrhea,gardens,fussing,fragment,fleeting,flawless,flashed,fetus,exclusively,eulogy,equality,enforce,distinctly,disrespectful,denies,crossbow,crest,cregg,crabs,cowardly,countess,contrast,contraction,contingency,consulted,connects,confirming,condone,coffins,cleansing,cheesecake,certainty,captain's,cages,c'est,briefed,brewing,bravest,bosom,boils,binoculars,bachelorette,aunt's,atta,assess,appetizer,ambushed,alerted,woozy,withhold,weighed,vulgar,viral,utmost,unusually,unleashed,unholy,unhappiness,underway,uncovered,unconditional,typewriter,typed,twists,sweeps,supervised,supermodel,suburbs,subpoenaed,stringing,snyder's,snot,skeptical,skateboard,shifted,secret's,scottish,schoolgirl,romantically,rocked,revoir,reviewed,respiratory,reopen,regiment,reflects,refined,puncture,pta,prone,produces,preach,pools,polished,pods,planetarium,penicillin,peacefully,partner's,nurturing,nation's,more'n,monastery,mmhmm,midgets,marklar,machinery,lodged,lifeline,joanna's,jer,jellyfish,infiltrate,implies,illegitimate,hutch,horseback,henri,heist,gents,frickin,freezes,forfeit,followers,flakes,flair,fathered,fascist,eternally,eta,epiphany,enlisted,eleventh,elect,effectively,dos,disgruntled,discrimination,discouraged,delinquent,decipher,danvers,dab,cubes,credible,coping,concession,cnn,clash,chills,cherished,catastrophe,caretaker,bulk,bras,branches,bombshell,birthright,billionaire,awol,ample,alumni,affections,admiration,abbotts,zelda's,whatnot,watering,vinegar,vietnamese,unthinkable,unseen,unprepared,unorthodox,underhanded,uncool,transmitted,traits,timeless,thump,thermometer,theoretically,theoretical,testament,tapping,tagged,tac,synthetic,syndicate,swung,surplus,supplier,stares,spiked,soviets,solves,smuggle,scheduling,scarier,saucer,reinforcements,recruited,rant,quitter,prudent,projection,previously,powdered,poked,pointers,placement,peril,penetrate,penance,patriotic,passions,opium,nudge,nostrils,nevermind,neurological,muslims,mow,momentum,mockery,mobster,mining,medically,magnitude,maggie's,loudly,listing,killer's,kar,jim's,insights,indicted,implicate,hypocritical,humanly,holiness,healthier,hammered,haldeman,gunman,graphic,gloom,geography,gary's,freshly,francs,formidable,flunked,flawed,feminist,faux,ewww,escorted,escapes,emptiness,emerge,drugging,dozer,doc's,directorate,diana's,derevko,deprive,deodorant,cryin,crusade,crocodile,creativity,controversial,commands,coloring,colder,cognac,clocked,clippings,christine's,chit,charades,chanting,certifiable,caterers,brute,brochures,briefs,bran,botched,blinders,bitchin,bauer's,banter,babu,appearing,adequate,accompanied,abrupt,abdomen,zones,wooo,woken,winding,vip,venezuela,unanimous,ulcer,tread,thirteenth,thankfully,tame,tabby's,swine,swimsuit,swans,suv,stressing,steaming,stamped,stabilize,squirm,spokesman,snooze,shuffle,shredded,seoul,seized,seafood,scratchy,savor,sadistic,roster,rica,rhetorical,revlon,realist,reactions,prosecuting,prophecies,prisons,precedent,polyester,petals,persuasion,paddles,o'leary,nuthin,neighbour,negroes,naval,mute,muster,muck,minnesota,meningitis,matron,mastered,markers,maris's,manufactured,lot's,lockers,letterman,legged,launching,lanes,journals,indictment,indicating,hypnotized,housekeeping,hopelessly,hmph,hallucinations,grader,goldilocks,girly,furthermore,frames,flask,expansion,envelopes,engaging,downside,doves,doorknob,distinctive,dissolve,discourage,disapprove,diabetic,departed,deliveries,decorator,deaq,crossfire,criminally,containment,comrades,complimentary,commitments,chum,chatter,chapters,catchy,cashier,cartel,caribou,cardiologist,bull's,buffer,brawl,bowls,booted,boat's,billboard,biblical,barbershop,awakening,aryan,angst,administer,acquitted,acquisition,aces,accommodate,zellie,yield,wreak,witch's,william's,whistles,wart,vandalism,vamps,uterus,upstate,unstoppable,unrelated,understudy,tristin,transporting,transcript,tranquilizer,trails,trafficking,toxins,tonsils,timing's,therapeutic,tex,subscription,submitted,stephanie's,stempel,spotting,spectator,spatula,soho,softer,snotty,slinging,showered,sexiest,sensual,scoring,sadder,roam,rimbaud,rim,rewards,restrain,resilient,remission,reinstate,rehash,recollection,rabies,quinn's,presenting,preference,prairie,popsicle,plausible,plantation,pharmaceutical,pediatric,patronizing,patent,participation,outdoor,ostrich,ortolani,oooooh,omelette,neighbor's,neglect,nachos,movie's,mixture,mistrial,mio,mcginty's,marseilles,mare,mandate,malt,luv,loophole,literary,liberation,laughin,lacey's,kevvy,jah,irritated,intends,initiation,initiated,initiate,influenced,infidelity,indigenous,inc,idaho,hypothermia,horrific,hive,heroine,groupie,grinding,graceful,government's,goodspeed,gestures,gah,frantic,extradition,evil's,engineers,echelon,earning,disks,discussions,demolition,definitive,dawnie,dave's,date's,dared,dan's,damsel,curled,courtyard,constitutes,combustion,collective,collateral,collage,col,chant,cassette,carol's,carl's,calculating,bumping,britain,bribes,boardwalk,blinds,blindly,bleeds,blake's,bickering,beasts,battlefield,bankruptcy,backside,avenge,apprehended,annie's,anguish,afghanistan,acknowledged,abusing,youthful,yells,yanking,whomever,when'd,waterfall,vomiting,vine,vengeful,utility,unpacking,unfamiliar,undying,tumble,trolls,treacherous,todo,tipping,tantrum,tanked,summons,strategies,straps,stomped,stinkin,stings,stance,staked,squirrels,sprinkles,speculate,specialists,sorting,skinned,sicko,sicker,shootin,shep,shatter,seeya,schnapps,s'posed,rows,rounded,ronee,rite,revolves,respectful,resource,reply,rendered,regroup,regretting,reeling,reckoned,rebuilding,randy's,ramifications,qualifications,pulitzer,puddy,projections,preschool,pots,potassium,plissken,platonic,peter's,permalash,performer,peasant,outdone,outburst,ogh,obscure,mutants,mugging,molecules,misfortune,miserably,miraculously,medications,medals,margaritas,manpower,lovemaking,long's,logo,logically,leeches,latrine,lamps,lacks,kneel,johnny's,jenny's,inflict,impostor,icon,hypocrisy,hype,hosts,hippies,heterosexual,heightened,hecuba's,hecuba,healer,habitat,gunned,grooming,groo,groin,gras,gory,gooey,gloomy,frying,friendships,fredo,foil,fishermen,firepower,fess,fathom,exhaustion,evils,epi,endeavor,ehh,eggnog,dreaded,drafted,dimensional,detached,deficit,d'arcy,crotch,coughing,coronary,cookin,contributed,consummate,congrats,concerts,companionship,caved,caspar,bulletproof,bris,brilliance,breakin,brash,blasting,beak,arabia,analyst,aluminum,aloud,alligator,airtight,advising,advertise,adultery,administered,aches,abstract,aahh,wronged,wal,voluntary,ventilation,upbeat,uncertainty,trot,trillion,tricia's,trades,tots,tol,tightly,thingies,tending,technician,tarts,surreal,summer's,strengths,specs,specialize,spat,spade,slogan,sloane's,shrew,shaping,seth's,selves,seemingly,schoolwork,roomie,requirements,redundant,redo,recuperating,recommendations,ratio,rabid,quart,pseudo,provocative,proudly,principal's,pretenses,prenatal,pillar,photographers,photographed,pharmaceuticals,patron,pacing,overworked,originals,nicotine,newsletter,neighbours,murderous,miller's,mileage,mechanics,mayonnaise,massages,maroon,lucrative,losin,lil,lending,legislative,kat,juno,iran,interrogated,instruction,injunction,impartial,homing,heartbreaker,harm's,hacks,glands,giver,fraizh,flows,flips,flaunt,excellence,estimated,espionage,englishman,electrocuted,eisenhower,dusting,ducking,drifted,donna's,donating,dom,distribute,diem,daydream,cylon,curves,crutches,crates,cowards,covenant,converted,contributions,composed,comfortably,cod,cockpit,chummy,chitchat,childbirth,charities,businesswoman,brood,brewery,bp's,blatant,bethy,barring,bagged,awakened,assumes,assembled,asbestos,arty,artwork,arc,anthony's,aka,airplanes,accelerated,worshipped,winnings,why're,whilst,wesley's,volleyball,visualize,unprotected,unleash,unexpectedly,twentieth,turnpike,trays,translated,tones,three's,thicker,therapists,takeoff,sums,stub,streisand,storm's,storeroom,stethoscope,stacked,sponsors,spiteful,solutions,sneaks,snapping,slaughtered,slashed,simplest,silverware,shits,secluded,scruples,scrubs,scraps,scholar,ruptured,rubs,roaring,relying,reflected,refers,receptionist,recap,reborn,raisin,rainforest,rae's,raditch,radiator,pushover,pout,plastered,pharmacist,petroleum,perverse,perpetrator,passages,ornament,ointment,occupy,nineties,napping,nannies,mousse,mort,morocco,moors,momentary,modified,mitch's,misunderstandings,marina's,marcy's,marched,manipulator,malfunction,loot,limbs,latitude,lapd,laced,kivar,kickin,interface,infuriating,impressionable,imposing,holdup,hires,hick,hesitated,hebrew,hearings,headphones,hammering,groundwork,grotesque,greenhouse,gradually,graces,genetics,gauze,garter,gangsters,g's,frivolous,freelance,freeing,fours,forwarding,feud,ferrars,faulty,fantasizing,extracurricular,exhaust,empathy,educate,divorces,detonate,depraved,demeaning,declaring,deadlines,dea,daria's,dalai,cursing,cufflink,crows,coupons,countryside,coo,consultation,composer,comply,comforted,clive,claustrophobic,chef's,casinos,caroline's,capsule,camped,cairo,busboy,bred,bravery,bluth,biography,berserk,bennetts,baskets,attacker,aplastic,angrier,affectionate,zit,zapped,yorker,yarn,wormhole,weaken,vat,unrealistic,unravel,unimportant,unforgettable,twain,tv's,tush,turnout,trio,towed,tofu,textbooks,territorial,suspend,supplied,superbowl,sundays,stutter,stewardess,stepson,standin,sshh,specializes,spandex,souvenirs,sociopath,snails,slope,skeletons,shivering,sexier,sequel,sensory,selfishness,scrapbook,romania,riverside,rites,ritalin,rift,ribbons,reunite,remarry,relaxation,reduction,realization,rattling,rapist,quad,pup,psychosis,promotions,presumed,prepping,posture,poses,pleasing,pisses,piling,photographic,pfft,persecuted,pear,part's,pantyhose,padded,outline,organizations,operatives,oohh,obituary,northeast,nina's,neural,negotiator,nba,natty,nathan's,minimize,merl,menopause,mennihan,marty's,martimmys,makers,loyalties,literal,lest,laynie,lando,justifies,josh's,intimately,interact,integrated,inning,inexperienced,impotent,immortality,imminent,ich,horrors,hooky,holders,hinges,heartbreaking,handcuffed,gypsies,guacamole,grovel,graziella,goggles,gestapo,fussy,functional,filmmaker,ferragamo,feeble,eyesight,explosions,experimenting,enzo's,endorsement,enchanting,eee,ed's,duration,doubtful,dizziness,dismantle,disciplinary,disability,detectors,deserving,depot,defective,decor,decline,dangling,dancin,crumble,criteria,creamed,cramping,cooled,conceal,component,competitors,clockwork,clark's,circuits,chrissakes,chrissake,chopping,cabinets,buttercup,brooding,bonfire,blurt,bluestar,bloated,blackmailer,beforehand,bathed,bathe,barcode,banjo,banish,badges,babble,await,attentive,artifacts,aroused,antibodies,animosity,administrator,accomplishments,ya'll,wrinkled,wonderland,willed,whisk,waltzing,waitressing,vis,vin,vila,vigilant,upbringing,unselfish,unpopular,unmarried,uncles,trendy,trajectory,targeting,surroundings,stun,striped,starbucks,stamina,stalled,staking,stag,spoils,snuff,snooty,snide,shrinking,senorita,securities,secretaries,scrutiny,scoundrel,saline,salads,sails,rundown,roz's,roommate's,riddles,responses,resistant,requirement,relapse,refugees,recommending,raspberry,raced,prosperity,programme,presumably,preparations,posts,pom,plight,pleaded,pilot's,peers,pecan,particles,pantry,overturned,overslept,ornaments,opposing,niner,nfl,negligent,negligence,nailing,mutually,mucho,mouthed,monstrous,monarchy,minsk,matt's,mateo's,marking,manufacturing,manager's,malpractice,maintaining,lowly,loitering,logged,lingering,light's,lettin,lattes,kim's,kamal,justification,juror,junction,julie's,joys,johnson's,jillefsky,jacked,irritate,intrusion,inscription,insatiable,infect,inadequate,impromptu,icing,hmmmm,hefty,grammar,generate,gdc,gasket,frightens,flapping,firstborn,fire's,fig,faucet,exaggerated,estranged,envious,eighteenth,edible,downward,dopey,doesn,disposition,disposable,disasters,disappointments,dipped,diminished,dignified,diaries,deported,deficiency,deceit,dealership,deadbeat,curses,coven,counselors,convey,consume,concierge,clutches,christians,cdc,casbah,carefree,callous,cahoots,caf,brotherly,britches,brides,bop,bona,bethie,beige,barrels,ballot,ave,autographed,attendants,attachment,attaboy,astonishing,ashore,appreciative,antibiotic,aneurysm,afterlife,affidavit,zuko,zoning,work's,whats,whaddaya,weakened,watermelon,vasectomy,unsuspecting,trial's,trailing,toula,topanga,tonio,toasted,tiring,thereby,terrorized,tenderness,tch,tailing,syllable,sweats,suffocated,sucky,subconsciously,starvin,staging,sprouts,spineless,sorrows,snowstorm,smirk,slicery,sledding,slander,simmer,signora,sigmund,siege,siberia,seventies,sedate,scented,sampling,sal's,rowdy,rollers,rodent,revenue,retraction,resurrection,resigning,relocate,releases,refusal,referendum,recuperate,receptive,ranking,racketeering,queasy,proximity,provoking,promptly,probability,priors,princes,prerogative,premed,pornography,porcelain,poles,podium,pinched,pig's,pendant,packet,owner's,outsiders,outpost,orbing,opportunist,olanov,observations,nurse's,nobility,neurologist,nate's,nanobot,muscular,mommies,molested,misread,melon,mediterranean,mea,mastermind,mannered,maintained,mackenzie's,liberated,lesions,lee's,laundromat,landscape,lagoon,labeled,jolt,intercom,inspect,insanely,infrared,infatuation,indulgent,indiscretion,inconsiderate,incidents,impaired,hurrah,hungarian,howling,honorary,herpes,hasta,harassed,hanukkah,guides,groveling,groosalug,geographic,gaze,gander,galactica,futile,fridays,flier,fixes,fide,fer,feedback,exploiting,exorcism,exile,evasive,ensemble,endorse,emptied,dreary,dreamy,downloaded,dodged,doctored,displayed,disobeyed,disneyland,disable,diego's,dehydrated,defect,customary,csc,criticizing,contracted,contemplating,consists,concepts,compensate,commonly,colours,coins,coconuts,cockroaches,clogged,cincinnati,churches,chronicle,chilling,chaperon,ceremonies,catalina's,cant,cameraman,bulbs,bucklands,bribing,brava,bracelets,bowels,bobby's,bmw,bluepoint,baton,barred,balm,audit,astronomy,aruba,appetizers,appendix,antics,anointed,analogy,almonds,albuquerque,abruptly,yore,yammering,winch,white's,weston's,weirdness,wangler,vibrations,vendor,unmarked,unannounced,twerp,trespass,tres,travesty,transported,transfusion,trainee,towelie,topics,tock,tiresome,thru,theatrical,terrain,suspect's,straightening,staggering,spaced,sonar,socializing,sitcom,sinus,sinners,shambles,serene,scraped,scones,scepter,sarris,saberhagen,rouge,rigid,ridiculously,ridicule,reveals,rents,reflecting,reconciled,rate's,radios,quota,quixote,publicist,pubes,prune,prude,provider,propaganda,prolonged,projecting,prestige,precrime,postponing,pluck,perpetual,permits,perish,peppermint,peeled,particle,parliament,overdo,oriented,optional,nutshell,notre,notions,nostalgic,nomination,mulan,mouthing,monkey's,mistook,mis,milhouse,mel's,meddle,maybourne,martimmy,loon,lobotomy,livelihood,litigation,lippman,likeness,laurie's,kindest,kare,kaffee,jocks,jerked,jeopardizing,jazzed,investing,insured,inquisition,inhale,ingenious,inflation,incorrect,igby,ideals,holier,highways,hereditary,helmets,heirloom,heinous,haste,harmsway,hardship,hanky,gutters,gruesome,groping,governments,goofing,godson,glare,garment,founding,fortunes,foe,finesse,figuratively,ferrie,fda,external,examples,evacuation,ethnic,est,endangerment,enclosed,emphasis,dyed,dud,dreading,dozed,dorky,dmitri,divert,dissertation,discredit,director's,dialing,describes,decks,cufflinks,crutch,creator,craps,corrupted,coronation,contemporary,consumption,considerably,comprehensive,cocoon,cleavage,chile,carriers,carcass,cannery,bystander,brushes,bruising,bribery,brainstorm,bolted,binge,bart's,barracuda,baroness,ballistics,b's,astute,arroway,arabian,ambitions,alexandra's,afar,adventurous,adoptive,addicts,addictive,accessible,yadda,wilson's,wigs,whitelighters,wematanye,weeds,wedlock,wallets,walker's,vulnerability,vroom,vibrant,vertical,vents,uuuh,urgh,upped,unsettling,unofficial,unharmed,underlying,trippin,trifle,tracing,tox,tormenting,timothy's,threads,theaters,thats,tavern,taiwan,syphilis,susceptible,summary,suites,subtext,stickin,spices,sores,smacked,slumming,sixteenth,sinks,signore,shitting,shameful,shacked,sergei,septic,seedy,security's,searches,righteousness,removal,relish,relevance,rectify,recruits,recipient,ravishing,quickest,pupil,productions,precedence,potent,pooch,pledged,phoebs,perverted,peeing,pedicure,pastrami,passionately,ozone,overlooking,outnumbered,outlook,oregano,offender,nukes,novelty,nosed,nighty,nifty,mugs,mounties,motivate,moons,misinterpreted,miners,mercenary,mentality,mas,marsellus,mapped,malls,lupus,lumbar,lovesick,longitude,lobsters,likelihood,leaky,laundering,latch,japs,jafar,instinctively,inspires,inflicted,inflammation,indoors,incarcerated,imagery,hundredth,hula,hemisphere,handkerchief,hand's,gynecologist,guittierez,groundhog,grinning,graduates,goodbyes,georgetown,geese,fullest,ftl,floral,flashback,eyelashes,eyelash,excluded,evening's,evacuated,enquirer,endlessly,encounters,elusive,disarm,detest,deluding,dangle,crabby,cotillion,corsage,copenhagen,conjugal,confessional,cones,commandment,coded,coals,chuckle,christmastime,christina's,cheeseburgers,chardonnay,ceremonial,cept,cello,celery,carter's,campfire,calming,burritos,burp,buggy,brundle,broflovski,brighten,bows,borderline,blinked,bling,beauties,bauers,battered,athletes,assisting,articulate,alot,alienated,aleksandr,ahhhhh,agreements,agamemnon,accountants,zat,y'see,wrongful,writer's,wrapper,workaholic,wok,winnebago,whispered,warts,vikki's,verified,vacate,updated,unworthy,unprecedented,unanswered,trend,transformed,transform,trademark,tote,tonane,tolerated,throwin,throbbing,thriving,thrills,thorns,thereof,there've,terminator,tendencies,tarot,tailed,swab,sunscreen,stretcher,stereotype,spike's,soggy,sobbing,slopes,skis,skim,sizable,sightings,shucks,shrapnel,sever,senile,sections,seaboard,scripts,scorned,saver,roxanne's,resemble,red's,rebellious,rained,putty,proposals,prenup,positioned,portuguese,pores,pinching,pilgrims,pertinent,peeping,pamphlet,paints,ovulating,outbreak,oppression,opposites,occult,nutcracker,nutcase,nominee,newt,newsstand,newfound,nepal,mocked,midterms,marshmallow,manufacturer,managers,majesty's,maclaren,luscious,lowered,loops,leans,laurence's,krudski,knowingly,keycard,katherine's,junkies,juilliard,judicial,jolinar,jase,irritable,invaluable,inuit,intoxicating,instruct,insolent,inexcusable,induce,incubator,illustrious,hydrogen,hunsecker,hub,houseguest,honk,homosexuals,homeroom,holly's,hindu,hernia,harming,handgun,hallways,hallucination,gunshots,gums,guineas,groupies,groggy,goiter,gingerbread,giggling,geometry,genre,funded,frontal,frigging,fledged,fedex,feat,fairies,eyeball,extending,exchanging,exaggeration,esteemed,ergo,enlist,enlightenment,encyclopedia,drags,disrupted,dispense,disloyal,disconnect,dimitri,desks,dentists,delhi,delacroix,degenerate,deemed,decay,daydreaming,cushions,cuddly,corroborate,contender,congregation,conflicts,confessions,complexion,completion,compensated,cobbler,closeness,chilled,checkmate,channing,carousel,calms,bylaws,bud's,benefactor,belonging,ballgame,baiting,backstabbing,assassins,artifact,armies,appoint,anthropology,anthropologist,alzheimer's,allegedly,alex's,airspace,adversary,adolf,actin,acre,aced,accuses,accelerant,abundantly,abstinence,abc,zsa,zissou,zandt,yom,yapping,wop,witchy,winter's,willows,whee,whadaya,want's,walter's,waah,viruses,vilandra,veiled,unwilling,undress,undivided,underestimating,ultimatums,twirl,truckload,tremble,traditionally,touring,touche,toasting,tingling,tiles,tents,tempered,sussex,sulking,stunk,stretches,sponges,spills,softly,snipers,slid,sedan,screens,scourge,rooftop,rog,rivalry,rifles,riana,revolting,revisit,resisted,rejects,refreshments,redecorating,recurring,recapture,raysy,randomly,purchases,prostitutes,proportions,proceeded,prevents,pretense,prejudiced,precogs,pouting,poppie,poofs,pimple,piles,pediatrician,patrick's,pathology,padre,packets,paces,orvelle,oblivious,objectivity,nikki's,nighttime,nervosa,navigation,moist,moan,minors,mic,mexicans,meurice,melts,mau,mats,matchmaker,markings,maeby,lugosi,lipnik,leprechaun,kissy,kafka,italians,introductions,intestines,intervene,inspirational,insightful,inseparable,injections,informal,influential,inadvertently,illustrated,hussy,huckabees,hmo,hittin,hiss,hemorrhaging,headin,hazy,haystack,hallowed,haiti,haa,grudges,grenades,granilith,grandkids,grading,gracefully,godsend,gobbles,fyi,future's,fun's,fret,frau,fragrance,fliers,firms,finchley,fbi's,farts,eyewitnesses,expendable,existential,endured,embraced,elk,ekg,dude's,dragonfly,dorms,domination,directory,depart,demonstrated,delaying,degrading,deduction,darlings,dante's,danes,cylons,counsellor,cortex,cop's,coordinator,contraire,consensus,consciously,conjuring,congratulating,compares,commentary,commandant,cokes,centimeters,cc's,caucus,casablanca,buffay,buddy's,brooch,bony,boggle,blood's,bitching,bistro,bijou,bewitched,benevolent,bends,bearings,barren,arr,aptitude,antenna,amish,amazes,alcatraz,acquisitions,abomination,worldly,woodstock,withstand,whispers,whadda,wayward,wayne's,wailing,vinyl,variables,vanishing,upscale,untouchable,unspoken,uncontrollable,unavoidable,unattended,tuning,trite,transvestite,toupee,timid,timers,themes,terrorizing,teamed,taipei,t's,swana,surrendered,suppressed,suppress,stumped,strolling,stripe,storybook,storming,stomachs,stoked,stationery,springtime,spontaneity,sponsored,spits,spins,soiree,sociology,soaps,smarty,shootout,shar,settings,sentiments,senator's,scramble,scouting,scone,runners,rooftops,retract,restrictions,residency,replay,remainder,regime,reflexes,recycling,rcmp,rawdon,ragged,quirky,quantico,psychologically,prodigal,primo,pounce,potty,portraits,pleasantries,plane's,pints,phd,petting,perceive,patrons,parameters,outright,outgoing,onstage,officer's,o'connor,notwithstanding,noah's,nibble,newmans,neutralize,mutilated,mortality,monumental,ministers,millionaires,mentions,mcdonald's,mayflower,masquerade,mangy,macreedy,lunatics,luau,lover's,lovable,louie's,locating,lizards,limping,lasagna,largely,kwang,keepers,juvie,jaded,ironing,intuitive,intensely,insure,installation,increases,incantation,identifying,hysteria,hypnotize,humping,heavyweight,happenin,gung,griet,grasping,glorified,glib,ganging,g'night,fueled,focker,flunking,flimsy,flaunting,fixated,fitzwallace,fictional,fearing,fainting,eyebrow,exonerated,ether,ers,electrician,egotistical,earthly,dusted,dues,donors,divisions,distinguish,displays,dismissal,dignify,detonation,deploy,departments,debrief,dazzling,dawn's,dan'l,damnedest,daisies,crushes,crucify,cordelia's,controversy,contraband,contestants,confronting,communion,collapsing,cocked,clock's,clicks,cliche,circular,circled,chord,characteristics,chandelier,casualty,carburetor,callers,bup,broads,breathes,boca,bobbie's,bloodshed,blindsided,blabbing,binary,bialystock,bashing,ballerina,ball's,aviva,avalanche,arteries,appliances,anthem,anomaly,anglo,airstrip,agonizing,adjourn,abandonment,zack's,you's,yearning,yams,wrecker,word's,witnessing,winged,whence,wept,warsaw,warp,warhead,wagons,visibility,usc,unsure,unions,unheard,unfreeze,unfold,unbalanced,ugliest,troublemaker,tolerant,toddler,tiptoe,threesome,thirties,thermostat,tampa,sycamore,switches,swipe,surgically,supervising,subtlety,stung,stumbling,stubs,struggles,stride,strangling,stamp's,spruce,sprayed,socket,snuggle,smuggled,skulls,simplicity,showering,shhhhh,sensor,sci,sac,sabotaging,rumson,rounding,risotto,riots,revival,responds,reserves,reps,reproduction,repairman,rematch,rehearsed,reelection,redi,recognizing,ratty,ragging,radiology,racquetball,racking,quieter,quicksand,pyramids,pulmonary,puh,publication,prowl,provisions,prompt,premeditated,prematurely,prancing,porcupine,plated,pinocchio,perceived,peeked,peddle,pasture,panting,overweight,oversee,overrun,outing,outgrown,obsess,o'donnell,nyu,nursed,northwestern,norma's,nodding,negativity,negatives,musketeers,mugger,mounting,motorcade,monument,merrily,matured,massimo's,masquerading,marvellous,marlena's,margins,maniacs,mag,lumpy,lovey,louse,linger,lilies,libido,lawful,kudos,knuckle,kitchen's,kennedy's,juices,judgments,joshua's,jars,jams,jamal's,jag,itches,intolerable,intermission,interaction,institutions,infectious,inept,incentives,incarceration,improper,implication,imaginative,ight,hussein,humanitarian,huckleberry,horatio,holster,heiress,heartburn,hayley's,hap,gunna,guitarist,groomed,greta's,granting,graciously,glee,gentleman's,fulfillment,fugitives,fronts,founder,forsaking,forgives,foreseeable,flavors,flares,fixation,figment,fickle,featuring,featured,fantasize,famished,faith's,fades,expiration,exclamation,evolve,euro,erasing,emphasize,elevator's,eiffel,eerie,earful,duped,dulles,distributor,distorted,dissing,dissect,dispenser,dilated,digit,differential,diagnostic,detergent,desdemona,debriefing,dazzle,damper,cylinder,curing,crowbar,crispina,crafty,crackpot,courting,corrections,cordial,copying,consuming,conjunction,conflicted,comprehension,commie,collects,cleanup,chiropractor,charmer,chariot,charcoal,chaplain,challenger,census,cd's,cauldron,catatonic,capabilities,calculate,bullied,buckets,brilliantly,breathed,boss's,booths,bombings,boardroom,blowout,blower,blip,blindness,blazing,birthday's,biologically,bibles,biased,beseech,barbaric,band's,balraj,auditorium,audacity,assisted,appropriations,applicants,anticipating,alcoholics,airhead,agendas,aft,admittedly,adapt,absolution,abbot,zing,youre,yippee,wittlesey,withheld,willingness,willful,whammy,webber's,weakest,washes,virtuous,violently,videotapes,vials,vee,unplugged,unpacked,unfairly,und,turbulence,tumbling,troopers,tricking,trenches,tremendously,travelled,travelers,traitors,torches,tommy's,tinga,thyroid,texture,temperatures,teased,tawdry,tat,taker,sympathies,swiped,swallows,sundaes,suave,strut,structural,stone's,stewie,stepdad,spewing,spasm,socialize,slither,sky's,simulator,sighted,shutters,shrewd,shocks,sherry's,sgc,semantics,scout's,schizophrenic,scans,savages,satisfactory,rya'c,runny,ruckus,royally,roadblocks,riff,rewriting,revoke,reversal,repent,renovation,relating,rehearsals,regal,redecorate,recovers,recourse,reconnaissance,receives,ratched,ramali,racquet,quince,quiche,puppeteer,puking,puffed,prospective,projected,problemo,preventing,praises,pouch,posting,postcards,pooped,poised,piled,phoney,phobia,performances,patty's,patching,participating,parenthood,pardner,oppose,oozing,oils,ohm,ohhhhh,nypd,numbing,novelist,nostril,nosey,nominate,noir,neatly,nato,naps,nappa,nameless,muzzle,muh,mortuary,moronic,modesty,mitz,missionary,mimi's,midwife,mercenaries,mcclane,maxie's,matuka,mano,mam,maitre,lush,lumps,lucid,loosened,loosely,loins,lawnmower,lane's,lamotta,kroehner,kristen's,juggle,jude's,joins,jinxy,jessep,jaya,jamming,jailhouse,jacking,ironically,intruders,inhuman,infections,infatuated,indoor,indigestion,improvements,implore,implanted,id's,hormonal,hoboken,hillbilly,heartwarming,headway,headless,haute,hatched,hartmans,harping,hari,grapevine,graffiti,gps,gon,gogh,gnome,ged,forties,foreigners,fool's,flyin,flirted,fingernail,fdr,exploration,expectation,exhilarating,entrusted,enjoyment,embark,earliest,dumper,duel,dubious,drell,dormant,docking,disqualified,disillusioned,dishonor,disbarred,directive,dicey,denny's,deleted,del's,declined,custodial,crunchy,crises,counterproductive,correspondent,corned,cords,cor,coot,contributing,contemplate,containers,concur,conceivable,commissioned,cobblepot,cliffs,clad,chief's,chickened,chewbacca,checkout,carpe,cap'n,campers,calcium,buyin,buttocks,bullies,brown's,brigade,brain's,braid,boxed,bouncy,blueberries,blubbering,bloodstream,bigamy,bel,beeped,bearable,bank's,awarded,autographs,attracts,attracting,asteroid,arbor,arab,apprentice,announces,andie's,ammonia,alarming,aidan's,ahoy,ahm,zan,wretch,wimps,widows,widower,whirlwind,whirl,weather's,warms,war's,wack,villagers,vie,vandelay,unveiling,uno,undoing,unbecoming,ucla,turnaround,tribunal,togetherness,tickles,ticker,tended,teensy,taunt,system's,sweethearts,superintendent,subcommittee,strengthen,stomach's,stitched,standpoint,staffers,spotless,splits,soothe,sonnet,smothered,sickening,showdown,shouted,shepherds,shelters,shawl,seriousness,separates,sen,schooled,schoolboy,scat,sats,sacramento,s'mores,roped,ritchie's,resembles,reminders,regulars,refinery,raggedy,profiles,preemptive,plucked,pheromones,particulars,pardoned,overpriced,overbearing,outrun,outlets,onward,oho,ohmigod,nosing,norwegian,nightly,nicked,neanderthal,mosquitoes,mortified,moisture,moat,mime,milky,messin,mecha,markinson,marivellas,mannequin,manderley,maid's,madder,macready,maciver's,lookie,locusts,lisbon,lifetimes,leg's,lanna,lakhi,kholi,joke's,invasive,impersonate,impending,immigrants,ick,i's,hyperdrive,horrid,hopin,hombre,hogging,hens,hearsay,haze,harpy,harboring,hairdo,hafta,hacking,gun's,guardians,grasshopper,graded,gobble,gatehouse,fourteenth,foosball,floozy,fitzgerald's,fished,firewood,finalize,fever's,fencing,felons,falsely,fad,exploited,euphemism,entourage,enlarged,ell,elitist,elegance,eldest,duo,drought,drokken,drier,dredge,dramas,dossier,doses,diseased,dictator,diarrhea,diagnose,despised,defuse,defendant's,d'amour,crowned,cooper's,continually,contesting,consistently,conserve,conscientious,conjured,completing,commune,commissioner's,collars,coaches,clogs,chenille,chatty,chartered,chamomile,casing,calculus,calculator,brittle,breached,boycott,blurted,birthing,bikinis,bankers,balancing,astounding,assaulting,aroma,arbitration,appliance,antsy,amnio,alienating,aliases,aires,adolescence,administrative,addressing,achieving,xerox,wrongs,workload,willona,whistling,werewolves,wallaby,veterans,usin,updates,unwelcome,unsuccessful,unseemly,unplug,undermining,ugliness,tyranny,tuesdays,trumpets,transference,traction,ticks,tete,tangible,tagging,swallowing,superheroes,sufficiently,studs,strep,stowed,stow,stomping,steffy,stature,stairway,sssh,sprain,spouting,sponsoring,snug,sneezing,smeared,slop,slink,slew,skid,simultaneously,simulation,sheltered,shakin,sewed,sewage,seatbelt,scariest,scammed,scab,sanctimonious,samir,rushes,rugged,routes,romanov,roasting,rightly,retinal,rethinking,resulted,resented,reruns,replica,renewed,remover,raiding,raided,racks,quantity,purest,progressing,primarily,presidente,prehistoric,preeclampsia,postponement,portals,poppa,pop's,pollution,polka,pliers,playful,pinning,pharaoh,perv,pennant,pelvic,paved,patented,paso,parted,paramedic,panels,pampered,painters,padding,overjoyed,orthodox,organizer,one'll,octavius,occupational,oakdale's,nous,nite,nicknames,neurosurgeon,narrows,mitt,misled,mislead,mishap,milltown,milking,microscopic,meticulous,mediocrity,meatballs,measurements,mandy's,malaria,machete,lydecker's,lurch,lorelai's,linda's,layin,lavish,lard,knockin,khruschev,kelso's,jurors,jumpin,jugular,journalists,jour,jeweler,jabba,intersection,intellectually,integral,installment,inquiries,indulging,indestructible,indebted,implicated,imitate,ignores,hyperventilating,hyenas,hurrying,huron,horizontal,hermano,hellish,heheh,header,hazardous,hart's,harshly,harper's,handout,handbag,grunemann,gots,glum,gland,glances,giveaway,getup,gerome,furthest,funhouse,frosting,franchise,frail,fowl,forwarded,forceful,flavored,flank,flammable,flaky,fingered,finalists,fatherly,famine,fags,facilitate,exempt,exceptionally,ethic,essays,equity,entrepreneur,enduring,empowered,employers,embezzlement,eels,dusk,duffel,downfall,dotted,doth,doke,distressed,disobey,disappearances,disadvantage,dinky,diminish,diaphragm,deuces,deployed,delia's,davidson's,curriculum,curator,creme,courteous,correspondence,conquered,comforts,coerced,coached,clots,clarification,cite,chunks,chickie,chick's,chases,chaperoning,ceramic,ceased,cartons,capri,caper,cannons,cameron's,calves,caged,bustin,bungee,bulging,bringin,brie,boomhauer,blowin,blindfolded,blab,biscotti,bird's,beneficial,bastard's,ballplayer,bagging,automated,auster,assurances,aschen,arraigned,anonymity,annex,animation,andi,anchorage,alters,alistair's,albatross,agreeable,advancement,adoring,accurately,abduct,wolfi,width,weirded,watchers,washroom,warheads,voltage,vincennes,villains,victorian,urgency,upward,understandably,uncomplicated,uhuh,uhhhh,twitching,trig,treadmill,transactions,topped,tiffany's,they's,thermos,termination,tenorman,tater,tangle,talkative,swarm,surrendering,summoning,substances,strive,stilts,stickers,stationary,squish,squashed,spraying,spew,sparring,sorrel's,soaring,snout,snort,sneezed,slaps,skanky,singin,sidle,shreck,shortness,shorthand,shepherd's,sharper,shamed,sculptures,scanning,saga,sadist,rydell,rusik,roulette,rodi's,rockefeller,revised,resumes,restoring,respiration,reiber's,reek,recycle,recount,reacts,rabbit's,purge,purgatory,purchasing,providence,prostate,princesses,presentable,poultry,ponytail,plotted,playwright,pinot,pigtails,pianist,phillippe,philippines,peddling,paroled,owww,orchestrated,orbed,opted,offends,o'hara,noticeable,nominations,nancy's,myrtle's,music's,mope,moonlit,moines,minefield,metaphors,memoirs,mecca,maureen's,manning's,malignant,mainframe,magicks,maggots,maclaine,lobe,loathing,linking,leper,leaps,leaping,lashed,larch,larceny,lapses,ladyship,juncture,jiffy,jane's,jakov,invoke,interpreted,internally,intake,infantile,increasingly,inadmissible,implement,immense,howl,horoscope,hoof,homage,histories,hinting,hideaway,hesitating,hellbent,heddy,heckles,hat's,harmony's,hairline,gunpowder,guidelines,guatemala,gripe,gratifying,grants,governess,gorge,goebbels,gigolo,generated,gears,fuzz,frigid,freddo,freddie's,foresee,filters,filmed,fertile,fellowship,feeling's,fascination,extinction,exemplary,executioner,evident,etcetera,estimates,escorts,entity,endearing,encourages,electoral,eaters,earplugs,draped,distributors,disrupting,disagrees,dimes,devastate,detain,deposits,depositions,delicacy,delays,darklighter,dana's,cynicism,cyanide,cutters,cronus,convoy,continuous,continuance,conquering,confiding,concentrated,compartments,companions,commodity,combing,cofell,clingy,cleanse,christmases,cheered,cheekbones,charismatic,cabaret,buttle,burdened,buddhist,bruenell,broomstick,brin,brained,bozos,bontecou,bluntman,blazes,blameless,bizarro,benny's,bellboy,beaucoup,barry's,barkeep,bali,bala,bacterial,axis,awaken,astray,assailant,aslan,arlington,aria,appease,aphrodisiac,announcements,alleys,albania,aitoro's,activation,acme,yesss,wrecks,woodpecker,wondrous,window's,wimpy,willpower,widowed,wheeling,weepy,waxing,waive,vulture,videotaped,veritable,vascular,variations,untouched,unlisted,unfounded,unforeseen,two's,twinge,truffles,triggers,traipsing,toxin,tombstone,titties,tidal,thumping,thor's,thirds,therein,testicles,tenure,tenor,telephones,technicians,tarmac,talby,tackled,systematically,swirling,suicides,suckered,subtitles,sturdy,strangler,stockbroker,stitching,steered,staple,standup,squeal,sprinkler,spontaneously,splendor,spiking,spender,sovereign,snipe,snip,snagged,slum,skimming,significantly,siddown,showroom,showcase,shovels,shotguns,shoelaces,shitload,shifty,shellfish,sharpest,shadowy,sewn,seizing,seekers,scrounge,scapegoat,sayonara,satan's,saddled,rung,rummaging,roomful,romp,retained,residual,requiring,reproductive,renounce,reggie's,reformed,reconsidered,recharge,realistically,radioed,quirks,quadrant,punctual,public's,presently,practising,pours,possesses,poolhouse,poltergeist,pocketbook,plural,plots,pleasure's,plainly,plagued,pity's,pillars,picnics,pesto,pawing,passageway,partied,para,owing,openings,oneself,oats,numero,nostalgia,nocturnal,nitwit,nile,nexus,neuro,negotiated,muss,moths,mono,molecule,mixer,medicines,meanest,mcbeal,matinee,margate,marce,manipulations,manhunt,manger,magicians,maddie's,loafers,litvack,lightheaded,lifeguard,lawns,laughingstock,kodak,kink,jewellery,jessie's,jacko,itty,inhibitor,ingested,informing,indignation,incorporate,inconceivable,imposition,impersonal,imbecile,ichabod,huddled,housewarming,horizons,homicides,hobo,historically,hiccups,helsinki,hehe,hearse,harmful,hardened,gushing,gushie,greased,goddamit,gigs,freelancer,forging,fonzie,fondue,flustered,flung,flinch,flicker,flak,fixin,finalized,fibre,festivus,fertilizer,fenmore's,farted,faggots,expanded,exonerate,exceeded,evict,establishing,enormously,enforced,encrypted,emdash,embracing,embedded,elliot's,elimination,dynamics,duress,dupres,dowser,doormat,dominant,districts,dissatisfied,disfigured,disciplined,discarded,dibbs,diagram,detailing,descend,depository,defining,decorative,decoration,deathbed,death's,dazzled,da's,cuttin,cures,crowding,crepe,crater,crammed,costly,cosmopolitan,cortlandt's,copycat,coordinated,conversion,contradict,containing,constructed,confidant,condemning,conceited,computer's,commute,comatose,coleman's,coherent,clinics,clapping,circumference,chuppah,chore,choksondik,chestnuts,catastrophic,capitalist,campaigning,cabins,briault,bottomless,boop,bonnet,board's,bloomingdale's,blokes,blob,bids,berluti,beret,behavioral,beggars,bar's,bankroll,bania,athos,assassinate,arsenic,apperantly,ancestor,akron,ahhhhhh,afloat,adjacent,actresses,accordingly,accents,abe's,zipped,zeros,zeroes,zamir,yuppie,youngsters,yorkers,writ,wisest,wipes,wield,whyn't,weirdos,wednesdays,villages,vicksburg,variable,upchuck,untraceable,unsupervised,unpleasantness,unpaid,unhook,unconscionable,uncalled,turks,tumors,trappings,translating,tragedies,townie,timely,tiki,thurgood,things'll,thine,tetanus,terrorize,temptations,teamwork,tanning,tampons,tact,swarming,surfaced,supporter,stuart's,stranger's,straitjacket,stint,stimulation,steroid,statistically,startling,starry,squander,speculating,source's,sollozzo,sobriety,soar,sneaked,smithsonian,slugs,slaw,skit,skedaddle,sinker,similarities,silky,shortcomings,shipments,sheila's,severity,sellin,selective,seattle's,seasoned,scrubbed,scrooge,screwup,scrapes,schooling,scarves,saturdays,satchel,sandburg's,sandbox,salesmen,rooming,romances,revolving,revere,resulting,reptiles,reproach,reprieve,recreational,rearranging,realtor,ravine,rationalize,raffle,quoted,punchy,psychobabble,provocation,profoundly,problematic,prescriptions,preferable,praised,polishing,poached,plow,pledges,planetary,plan's,pirelli,perverts,peaked,pastures,pant,oversized,overdressed,outdid,outdated,oriental,ordinance,orbs,opponents,occurrence,nuptials,nominees,nineteenth,nefarious,mutiny,mouthpiece,motels,mopping,moon's,mongrel,monetary,mommie,missin,metaphorically,merv,mertin,memos,memento,melodrama,melancholy,measles,meaner,marches,mantel,maneuvers,maneuvering,mailroom,machine's,luring,listenin,lion's,lifeless,liege,licks,libraries,liberties,levon,legwork,lanka,lacked,kneecaps,kippur,kiddie,kaput,justifiable,jigsaw,issuing,islamic,insistent,insidious,innuendo,innit,inhabitants,individually,indicator,indecent,imaginable,illicit,hymn,hurling,humane,hospitalized,horseshit,hops,hondo,hemorrhoid,hella,healthiest,haywire,hamsters,halibut,hairbrush,hackers,guam,grouchy,grisly,griffin's,gratuitous,glutton,glimmer,gibberish,ghastly,geologist,gentler,generously,generators,geeky,gaga,furs,fuhrer,fronting,forklift,foolin,fluorescent,flats,flan,financed,filmmaking,fight's,faxes,faceless,extinguisher,expressions,expel,etched,entertainer,engagements,endangering,empress,egos,educator,ducked,dual,dramatically,dodgeball,dives,diverted,dissolved,dislocated,discrepancy,discovers,dink,devour,destroyers,derail,deputies,dementia,decisive,daycare,daft,cynic,crumbling,cowardice,cow's,covet,cornwallis,corkscrew,cookbook,conditioned,commendation,commandments,columns,coincidental,cobwebs,clouded,clogging,clicking,clasp,citizenship,chopsticks,chefs,chaps,catherine's,castles,cashing,carat,calmer,burgundy,bulldog's,brightly,brazen,brainwashing,bradys,bowing,booties,bookcase,boned,bloodsucking,blending,bleachers,bleached,belgian,bedpan,bearded,barrenger,bachelors,awwww,atop,assures,assigning,asparagus,arabs,apprehend,anecdote,amoral,alterations,alli,aladdin,aggravation,afoot,acquaintances,accommodating,accelerate,yakking,wreckage,worshipping,wladek,willya,willies,wigged,whoosh,whisked,wavelength,watered,warpath,warehouses,volts,vitro,violates,viewed,vicar,valuables,users,urging,uphill,unwise,untimely,unsavory,unresponsive,unpunished,unexplained,unconventional,tubby,trolling,treasurer,transfers,toxicology,totaled,tortoise,tormented,toothache,tingly,tina's,timmiihh,tibetan,thursdays,thoreau,terrifies,temperature's,temperamental,telegrams,ted's,technologies,teaming,teal'c's,talkie,takers,table's,symbiote,swirl,suffocate,subsequently,stupider,strapping,store's,steckler,standardized,stampede,stainless,springing,spreads,spokesperson,speeds,someway,snowflake,sleepyhead,sledgehammer,slant,slams,situation's,showgirl,shoveling,shmoopy,sharkbait,shan't,seminars,scrambling,schizophrenia,schematics,schedule's,scenic,sanitary,sandeman,saloon,sabbatical,rural,runt,rummy,rotate,reykjavik,revert,retrieved,responsive,rescheduled,requisition,renovations,remake,relinquish,rejoice,rehabilitation,recreation,reckoning,recant,rebuilt,rebadow,reassurance,reassigned,rattlesnake,ramble,racism,quor,prowess,prob,primed,pricey,predictions,prance,pothole,pocus,plains,pitches,pistols,persist,perpetrated,penal,pekar,peeling,patter,pastime,parmesan,paper's,papa's,panty,pail,pacemaker,overdrive,optic,operas,ominous,offa,observant,nothings,noooooo,nonexistent,nodded,nieces,neia,neglecting,nauseating,mutton,mutated,musket,munson's,mumbling,mowing,mouthful,mooseport,monologue,momma's,moly,mistrust,meetin,maximize,masseuse,martha's,marigold,mantini,mailer,madre,lowlifes,locksmith,livid,liven,limos,licenses,liberating,lhasa,lenin,leniency,leering,learnt,laughable,lashes,lasagne,laceration,korben,katan,kalen,jordan's,jittery,jesse's,jammies,irreplaceable,intubate,intolerant,inhaler,inhaled,indifferent,indifference,impound,imposed,impolite,humbly,holocaust,heroics,heigh,gunk,guillotine,guesthouse,grounding,groundbreaking,groom's,grips,grant's,gossiping,goatee,gnomes,gellar,fusion's,fumble,frutt,frobisher,freudian,frenchman,foolishness,flagged,fixture,femme,feeder,favored,favorable,fatso,fatigue,fatherhood,farmer's,fantasized,fairest,faintest,factories,eyelids,extravagant,extraterrestrial,extraordinarily,explicit,escalator,eros,endurance,encryption,enchantment's,eliminating,elevate,editors,dysfunction,drivel,dribble,dominican,dissed,dispatched,dismal,disarray,dinnertime,devastation,dermatologist,delicately,defrost,debutante,debacle,damone,dainty,cuvee,culpa,crucified,creeped,crayons,courtship,counsel's,convene,continents,conspicuous,congresswoman,confinement,conferences,confederate,concocted,compromises,comprende,composition,communism,comma,collectors,coleslaw,clothed,clinically,chug,chickenshit,checkin,chaotic,cesspool,caskets,cancellation,calzone,brothel,boomerang,bodega,bloods,blasphemy,black's,bitsy,bink,biff,bicentennial,berlini,beatin,beards,barbas,barbarians,backpacking,audiences,artist's,arrhythmia,array,arousing,arbitrator,aqui,appropriately,antagonize,angling,anesthetic,altercation,alice's,aggressor,adversity,adopting,acne,accordance,acathla,aaahhh,wreaking,workup,workings,wonderin,wolf's,wither,wielding,whopper,what'm,what'cha,waxed,vibrating,veterinarian,versions,venting,vasey,valor,validate,urged,upholstery,upgraded,untied,unscathed,unsafe,unlawful,uninterrupted,unforgiving,undies,uncut,twinkies,tucking,tuba,truffle,truck's,triplets,treatable,treasured,transmit,tranquility,townspeople,torso,tomei,tipsy,tinsel,timeline,tidings,thirtieth,tensions,teapot,tasks,tantrums,tamper,talky,swayed,swapping,sven,sulk,suitor,subjected,stylist,stroller,storing,stirs,statistical,standoff,staffed,squadron,sprinklers,springsteen,specimens,sparkly,song's,snowy,snobby,snatcher,smoother,smith's,sleepin,shrug,shortest,shoebox,shel,sheesh,shee,shackles,setbacks,sedatives,screeching,scorched,scanned,satyr,sammy's,sahib,rosemary's,rooted,rods,roadblock,riverbank,rivals,ridiculed,resentful,repellent,relates,registry,regarded,refugee,recreate,reconvene,recalled,rebuttal,realmedia,quizzes,questionnaire,quartet,pusher,punctured,pucker,propulsion,promo,prolong,professionalism,prized,premise,predators,portions,pleasantly,planet's,pigsty,physicist,phil's,penniless,pedestrian,paychecks,patiently,paternal,parading,pa's,overactive,ovaries,orderlies,oracles,omaha,oiled,offending,nudie,neonatal,neighborly,nectar,nautical,naught,moops,moonlighting,mobilize,mite,misleading,milkshake,mickey's,metropolitan,menial,meats,mayan,maxed,marketplace,mangled,magua,lunacy,luckier,llanview's,livestock,liters,liter,licorice,libyan,legislature,lasers,lansbury,kremlin,koreans,kooky,knowin,kilt,junkyard,jiggle,jest,jeopardized,jags,intending,inkling,inhalation,influences,inflated,inflammatory,infecting,incense,inbound,impractical,impenetrable,iffy,idealistic,i'mma,hypocrites,hurtin,humbled,hosted,homosexuality,hologram,hokey,hocus,hitchhiking,hemorrhoids,headhunter,hassled,harts,hardworking,haircuts,hacksaw,guerrilla,genitals,gazillion,gatherings,ganza's,gammy,gamesphere,fugue,fuels,forests,footwear,folly,folds,flexibility,flattened,flashlights,fives,filet,field's,famously,extenuating,explored,exceed,estrogen,envisioned,entails,emerged,embezzled,eloquent,egomaniac,dummies,duds,ducts,drowsy,drones,dragon's,drafts,doree,donovon,donny's,docked,dixon's,distributed,disorders,disguises,disclose,diggin,dickie's,detachment,deserting,depriving,demographic,delegation,defying,deductible,decorum,decked,daylights,daybreak,dashboard,darien,damnation,d'angelo's,cuddling,crunching,crickets,crazies,crayon,councilman,coughed,coordination,conundrum,contractors,contend,considerations,compose,complimented,compliance,cohaagen,clutching,cluster,clued,climbs,clader,chuck's,chromosome,cheques,checkpoint,chats,channeling,ceases,catholics,cassius,carver's,carasco,capped,capisce,cantaloupe,cancelling,campsite,camouflage,cambodia,burglars,bureaucracy,breakfasts,branding,bra'tac,book's,blueprint,bleedin,blaze's,blabbed,bisexual,bile,big's,beverages,beneficiary,battery's,basing,avert,avail,autobiography,atone,army's,arlyn,ares,architectural,approves,apothecary,anus,antiseptic,analytical,amnesty,alphabetical,alignment,aligned,aleikuum,advisory,advisors,advisement,adulthood,acquiring,accessed,zombie's,zadir,wrestled,wobbly,withnail,wheeled,whattaya,whacking,wedged,wanders,walkman,visionary,virtues,vincent's,vega's,vaginal,usage,unnamed,uniquely,unimaginable,undeniable,unconditionally,uncharted,unbridled,tweezers,tvmegasite,trumped,triumphant,trimming,tribes,treading,translates,tranquilizers,towing,tout,toontown,thunk,taps,taboo,suture,suppressing,succeeding,submission,strays,stonewall,stogie,stepdaughter,stalls,stace,squint,spouses,splashed,speakin,sounder,sorrier,sorrel,sorcerer,sombrero,solemnly,softened,socialist,snobs,snippy,snare,smoothing,slump,slimeball,slaving,sips,singular,silently,sicily,shiller,shayne's,shareholders,shakedown,sensations,seagulls,scrying,scrumptious,screamin,saucy,santoses,santos's,sanctions,roundup,roughed,rosary,robechaux,roadside,riley's,retrospect,resurrected,restoration,reside,researched,rescind,reproduce,reprehensible,repel,rendering,remodeling,religions,reconsidering,reciprocate,ratchet,rambaldi's,railroaded,raccoon,quasi,psychics,psat,promos,proclamation,problem's,prob'ly,pristine,printout,priestess,prenuptial,prediction,precedes,pouty,potter's,phoning,petersburg,peppy,pariah,parched,parcel,panes,overloaded,overdoing,operators,oldies,obesity,nymphs,nother,notebooks,nook,nikolai,nearing,nearer,mutation,municipal,monstrosity,minister's,milady,mieke,mephesto,memory's,melissa's,medicated,marshals,manilow,mammogram,mainstream,madhouse,m'lady,luxurious,luck's,lucas's,lotsa,loopy,logging,liquids,lifeboat,lesion,lenient,learner,lateral,laszlo,larva,kross,kinks,jinxed,involuntary,inventor,interim,insubordination,inherent,ingrate,inflatable,independently,incarnate,inane,imaging,hypoglycemia,huntin,humorous,humongous,hoodlum,honoured,honking,hitler's,hemorrhage,helpin,hearing's,hathor,hatching,hangar,halftime,guise,guggenheim,grrr,grotto,grandson's,grandmama,gorillas,godless,girlish,ghouls,gershwin,frosted,friday's,forwards,flutter,flourish,flagpole,finely,finder's,fetching,fatter,fated,faithfully,faction,fabrics,exposition,expo,exploits,exert,exclude,eviction,everwood's,evasion,espn,escorting,escalate,enticing,enroll,enhancement,endowed,enchantress,emerging,elopement,drills,drat,downtime,downloading,dorks,doorways,doctorate,divulge,dissociative,diss,disgraceful,disconcerting,dirtbag,deteriorating,deteriorate,destinies,depressive,dented,denim,defeating,decruz,decidedly,deactivate,daydreams,czar,curls,culprit,cues,crybaby,cruelest,critique,crippling,cretin,cranberries,cous,coupled,corvis,copped,convicts,converts,contingent,contests,complement,commend,commemorate,combinations,coastguard,cloning,cirque,churning,chock,chivalry,chemotherapy,charlotte's,chancellor's,catalogues,cartwheels,carpets,carols,canister,camera's,buttered,bureaucratic,bundt,buljanoff,bubbling,brokers,broaden,brimstone,brainless,borneo,bores,boing,bodied,billie's,biceps,beijing,bead,badmouthing,bad's,avec,autopilot,attractions,attire,atoms,atheist,ascertain,artificially,archbishop,aorta,amps,ampata,amok,alloy,allied,allenby,align,albeit,aired,aint,adjoining,accosted,abyss,absolve,aborted,aaagh,aaaaaah,your's,yonder,yellin,yearly,wyndham,wrongdoing,woodsboro,wigging,whup,wasteland,warranty,waltzed,walnuts,wallace's,vividly,vibration,verses,veggie,variation,validation,unnecessarily,unloaded,unicorns,understated,undefeated,unclean,umbrellas,tyke,twirling,turpentine,turnover,tupperware,tugger,triangles,triage,treehouse,tract,toil,tidbit,tickled,thud,threes,thousandth,thingie,terminally,temporal,teething,tassel,talkies,syndication,syllables,swoon,switchboard,swerved,suspiciously,superiority,successor,subsequentlyne,subsequent,subscribe,strudel,stroking,strictest,steven's,stensland,stefan's,starsky,starin,stannart,squirming,squealing,sorely,solidarity,softie,snookums,sniveling,snail,smidge,smallpox,sloth,slab,skulking,singled,simian,silo,sightseeing,siamese,shudder,shoppers,shax,sharpen,shannen,semtex,sellout,secondhand,season's,seance,screenplay,scowl,scorn,scandals,santiago's,safekeeping,sacked,russe,rummage,rosie's,roshman,roomies,roaches,rinds,retrace,retires,resuscitate,restrained,residential,reservoir,rerun,reputations,rekall,rejoin,refreshment,reenactment,recluse,ravioli,raves,ranked,rampant,rama,rallies,raking,purses,punishable,punchline,puked,provincial,prosky,prompted,processor,previews,prepares,poughkeepsie,poppins,polluted,placenta,pissy,petulant,peterson's,perseverance,persecution,pent,peasants,pears,pawns,patrols,pastries,partake,paramount,panky,palate,overzealous,overthrow,overs,oswald's,oskar,originated,orchids,optical,onset,offenses,obstructing,objectively,obituaries,obedient,obedience,novice,nothingness,nitrate,newer,nets,mwah,musty,mung,motherly,mooning,monique's,momentous,moby,mistaking,mistakenly,minutemen,milos,microchip,meself,merciless,menelaus,mazel,mauser,masturbate,marsh's,manufacturers,mahogany,lysistrata,lillienfield,likable,lightweight,liberate,leveled,letdown,leer,leeloo,larynx,lardass,lainey,lagged,lab's,klorel,klan,kidnappings,keyed,karmic,jive,jiggy,jeebies,isabel's,irate,iraqi,iota,iodine,invulnerable,investor,intrusive,intricate,intimidation,interestingly,inserted,insemination,inquire,innate,injecting,inhabited,informative,informants,incorporation,inclination,impure,impasse,imbalance,illiterate,i'ma,i'ii,hurled,hunts,hispanic,hematoma,help's,helen's,headstrong,harmonica,hark,handmade,handiwork,gymnasium,growling,governors,govern,gorky,gook,girdle,getcha,gesundheit,gazing,gazette,garde,galley,funnel,fred's,fossils,foolishly,fondness,flushing,floris,firearm,ferocious,feathered,fateful,fancies,fakes,faker,expressway,expire,exec,ever'body,estates,essentials,eskimos,equations,eons,enlightening,energetic,enchilada,emmi,emissary,embolism,elsinore,ecklie,drenched,drazi,doped,dogging,documentation,doable,diverse,disposed,dislikes,dishonesty,disengage,discouraging,diplomat,diplomacy,deviant,descended,derailed,depleted,demi,deformed,deflect,defines,defer,defcon,deactivated,crips,creditors,counters,corridors,cordy's,conversation's,constellations,congressmen,congo,complimenting,colombian,clubbing,clog,clint's,clawing,chromium,chimes,chicken's,chews,cheatin,chaste,ceremony's,cellblock,ceilings,cece,caving,catered,catacombs,calamari,cabbie,bursts,bullying,bucking,brulee,brits,brisk,breezes,brandon's,bounces,boudoir,blockbuster,binks,better'n,beluga,bellied,behrani,behaves,bedding,battalion,barriers,banderas,balmy,bakersfield,badmouth,backers,avenging,atat,aspiring,aromatherapy,armpit,armoire,anythin,another's,anonymously,anniversaries,alonzo's,aftershave,affordable,affliction,adrift,admissible,adieu,activist,acquittal,yucky,yearn,wrongly,wino,whitter,whirlpool,wendigo,watchdog,wannabes,walkers,wakey,vomited,voicemail,verb,vans,valedictorian,vacancy,uttered,up's,unwed,unrequited,unnoticed,unnerving,unkind,unjust,uniformed,unconfirmed,unadulterated,unaccounted,uglier,tyler's,twix,turnoff,trough,trolley,trampled,tramell,traci's,tort,toads,titled,timbuktu,thwarted,throwback,thon,thinker,thimble,tasteless,tarantula,tammy's,tamale,takeovers,symposium,symmetry,swish,supposing,supporters,suns,sully,streaking,strands,statutory,starlight,stargher,starch,stanzi,stabs,squeamish,spokane,splattered,spiritually,spilt,sped,speciality,spacious,soundtrack,smacking,slain,slag,slacking,skywire,skips,skeet,skaara,simpatico,shredding,showin,shortcuts,shite,shielding,sheep's,shamelessly,serafine,sentimentality,sect,secretary's,seasick,scientifically,scholars,schemer,scandalous,saturday's,salts,saks,sainted,rustic,rugs,riedenschneider,ric's,rhyming,rhetoric,revolt,reversing,revel,retractor,retards,retaliation,resurrect,remiss,reminiscing,remanded,reluctance,relocating,relied,reiben,regions,regains,refuel,refresher,redoing,redheaded,redeemed,recycled,reassured,rearranged,rapport,qumar,prowling,promotional,promoter,preserving,prejudices,precarious,powwow,pondering,plunger,plunged,pleasantville,playpen,playback,pioneers,physicians,phlegm,perfected,pancreas,pakistani,oxide,ovary,output,outbursts,oppressed,opal's,ooohhh,omoroca,offed,o'toole,nurture,nursemaid,nosebleed,nixon's,necktie,muttering,munchies,mucking,mogul,mitosis,misdemeanor,miscarried,minx,millionth,migraines,midler,methane,metabolism,merchants,medicinal,margaret's,manifestation,manicurist,mandelbaum,manageable,mambo,malfunctioned,mais,magnesium,magnanimous,loudmouth,longed,lifestyles,liddy,lickety,leprechauns,lengthy,komako,koji's,klute,kennel,kathy's,justifying,jerusalem,israelis,isle,irreversible,inventing,invariably,intervals,intergalactic,instrumental,instability,insinuate,inquiring,ingenuity,inconclusive,incessant,improv,impersonation,impeachment,immigrant,id'd,hyena,humperdinck,humm,hubba,housework,homeland,holistic,hoffa,hither,hissy,hippy,hijacked,hero's,heparin,hellooo,heat's,hearth,hassles,handcuff,hairstyle,hadda,gymnastics,guys'll,gutted,gulp,gulls,guard's,gritty,grievous,gravitational,graft,gossamer,gooder,glory's,gere,gash,gaming,gambled,galaxies,gadgets,fundamentals,frustrations,frolicking,frock,frilly,fraser's,francais,foreseen,footloose,fondly,fluent,flirtation,flinched,flight's,flatten,fiscal,fiercely,felicia's,fashionable,farting,farthest,farming,facade,extends,exposer,exercised,evading,escrow,errr,enzymes,energies,empathize,embryos,embodiment,ellsberg,electromagnetic,ebola,earnings,dulcinea,dreamin,drawbacks,drains,doyle's,doubling,doting,doose's,doose,doofy,dominated,dividing,diversity,disturbs,disorderly,disliked,disgusts,devoid,detox,descriptions,denominator,demonstrating,demeanor,deliriously,decode,debauchery,dartmouth,d'oh,croissant,cravings,cranked,coworkers,councilor,council's,convergence,conventions,consistency,consist,conquests,conglomerate,confuses,confiscate,confines,confesses,conduit,compress,committee's,commanded,combed,colonel's,coated,clouding,clamps,circulating,circa,cinch,chinnery,celebratory,catalogs,carpenters,carnal,carla's,captures,capitan,capability,canin,canes,caitlin's,cadets,cadaver,cable's,bundys,bulldozer,buggers,bueller,bruno's,breakers,brazilian,branded,brainy,booming,bookstores,bloodbath,blister,bittersweet,biologist,billed,betty's,bellhop,beeping,beaut,beanstalk,beady,baudelaire,bartenders,bargains,ballad,backgrounds,averted,avatar's,atmospheric,assert,assassinated,armadillo,archive,appreciating,appraised,antlers,anterior,alps,aloof,allowances,alleyway,agriculture,agent's,affleck,acknowledging,achievements,accordion,accelerator,abracadabra,abject,zinc,zilch,yule,yemen,xanax,wrenching,wreath,wouldn,witted,widely,wicca,whorehouse,whooo,whips,westchester,websites,weaponry,wasn,walsh's,vouchers,vigorous,viet,victimized,vicodin,untested,unsolicited,unofficially,unfocused,unfettered,unfeeling,unexplainable,uneven,understaffed,underbelly,tutorial,tuberculosis,tryst,trois,trix,transmitting,trampoline,towering,topeka,tirade,thieving,thang,tentacles,teflon,teachings,tablets,swimmin,swiftly,swayzak,suspecting,supplying,suppliers,superstitions,superhuman,subs,stubbornness,structures,streamers,strattman,stonewalling,stimulate,stiffs,station's,stacking,squishy,spout,splice,spec,sonrisa,smarmy,slows,slicing,sisterly,sierra's,sicilian,shrill,shined,shift's,seniority,seine,seeming,sedley,seatbelts,scour,scold,schoolyard,scarring,sash,sark's,salieri,rustling,roxbury,richly,rexy,rex's,rewire,revved,retriever,respective,reputable,repulsed,repeats,rendition,remodel,relocated,reins,reincarnation,regression,reconstruction,readiness,rationale,rance,rafters,radiohead,radio's,rackets,quarterly,quadruple,pumbaa,prosperous,propeller,proclaim,probing,privates,pried,prewedding,premeditation,posturing,posterity,posh,pleasurable,pizzeria,pish,piranha,pimps,penmanship,penchant,penalties,pelvis,patriotism,pasa,papaya,packaging,overturn,overture,overstepped,overcoat,ovens,outsmart,outed,orient,ordained,ooohh,oncologist,omission,olly,offhand,odour,occurring,nyazian,notarized,nobody'll,nightie,nightclubs,newsweek,nesting,navel,nationwide,nabbed,naah,mystique,musk,mover,mortician,morose,moratorium,monster's,moderate,mockingbird,mobsters,misconduct,mingling,mikey's,methinks,metaphysical,messengered,merge,merde,medallion,mathematical,mater,mason's,masochist,martouf,martians,marinara,manray,manned,mammal,majorly,magnifying,mackerel,mabel's,lyme,lurid,lugging,lonnegan,loathsome,llantano,liszt,listings,limiting,liberace,leprosy,latinos,lanterns,lamest,laferette,ladybird,kraut,kook,kits,kipling,joyride,inward,intestine,innocencia,inhibitions,ineffectual,indisposed,incurable,incumbent,incorporated,inconvenienced,inanimate,improbable,implode,idea's,hypothesis,hydrant,hustling,hustled,huevos,how'm,horseshoe,hooey,hoods,honcho,hinge,hijack,heroism,hermit,heimlich,harvesting,hamunaptra,haladki,haiku,haggle,haaa,gutsy,grunting,grueling,grit,grifter,grievances,gribbs,greevy,greeted,green's,grandstanding,godparents,glows,glistening,glider,gimmick,genocide,gaping,fraiser,formalities,foreigner,forecast,footprint,folders,foggy,flaps,fitty,fiends,femmes,fearful,fe'nos,favours,fabio,eyeing,extort,experimentation,expedite,escalating,erect,epinephrine,entitles,entice,enriched,enable,emissions,eminence,eights,ehhh,educating,eden's,earthquakes,earthlings,eagerly,dunville,dugout,draining,doublemeat,doling,disperse,dispensing,dispatches,dispatcher,discoloration,disapproval,diners,dieu,diddly,dictates,diazepam,descendants,derogatory,deposited,delights,defies,decoder,debates,dealio,danson,cutthroat,crumbles,crud,croissants,crematorium,craftsmanship,crafted,could'a,correctional,cordless,cools,contradiction,constitute,conked,confine,concealing,composite,complicates,communique,columbian,cockamamie,coasters,clusters,clobbered,clipping,clipboard,clergy,clemenza,cleanser,circumcision,cindy's,chisel,character's,chanukah,certainaly,centerpiece,cellmate,cartoonist,cancels,cadmium,buzzed,busiest,bumstead,bucko,browsing,broth,broader,break's,braver,boundary,boggling,bobbing,blurred,birkhead,bethesda,benet,belvedere,bellies,begrudge,beckworth,bebe's,banky,baldness,bagpipes,baggy,babysitters,aversion,auxiliary,attributes,attain,astonished,asta,assorted,aspirations,arnold's,area's,appetites,apparel,apocalyptic,apartment's,announcer,angina,amiss,ambulances,allo,alleviate,alibis,algeria,alaskan,airway,affiliated,aerial,advocating,adrenalin,admires,adhesive,actively,accompanying,zeta,yoyou,yoke,yachts,wreaked,wracking,woooo,wooing,wised,winnie's,wind's,wilshire,wedgie,watson's,warden's,waging,violets,vincey,victorious,victories,velcro,vastly,valves,valley's,uplifting,untrustworthy,unmitigated,universities,uneventful,undressing,underprivileged,unburden,umbilical,twigs,tweet,tweaking,turquoise,trustees,truckers,trimmed,triggering,treachery,trapping,tourism,tosses,torching,toothpick,toga,toasty,toasts,tiamat,thickens,ther,tereza,tenacious,temperament,televised,teldar,taxis,taint,swill,sweatin,sustaining,surgery's,surgeries,succeeds,subtly,subterranean,subject's,subdural,streep,stopwatch,stockholder,stillwater,steamer,stang's,stalkers,squished,squeegee,splinters,spliced,splat,spied,specialized,spaz,spackle,sophistication,snapshots,smoky,smite,sluggish,slithered,skin's,skeeters,sidewalks,sickly,shrugs,shrubbery,shrieking,shitless,shithole,settin,servers,serge,sentinels,selfishly,segments,scarcely,sawdust,sanitation,sangria,sanctum,samantha's,sahjhan,sacrament,saber,rustle,rupture,rump,roving,rousing,rosomorf,rosario's,rodents,robust,rigs,riddled,rhythms,revelations,restart,responsibly,repression,reporter's,replied,repairing,renoir,remoray,remedial,relocation,relies,reinforcement,refundable,redirect,recheck,ravenwood,rationalizing,ramus,ramsey's,ramelle,rails,radish,quivering,pyjamas,puny,psychos,prussian,provocations,prouder,protestors,protesters,prohibited,prohibit,progression,prodded,proctologist,proclaimed,primordial,pricks,prickly,predatory,precedents,praising,pragmatic,powerhouse,posterior,postage,porthos,populated,poly,pointe,pivotal,pinata,persistence,performers,pentangeli,pele,pecs,pathetically,parka,parakeet,panicky,pandora's,pamphlets,paired,overthruster,outsmarted,ottoman,orthopedic,oncoming,oily,offing,nutritious,nuthouse,nourishment,nietzsche,nibbling,newlywed,newcomers,need's,nautilus,narcissist,myths,mythical,mutilation,mundane,mummy's,mummies,mumble,mowed,morvern,mortem,mortal's,mopes,mongolian,molasses,modification,misplace,miscommunication,miney,militant,midlife,mens,menacing,memorizing,memorabilia,membrane,massaging,masking,maritime,mapping,manually,magnets,ma's,luxuries,lows,lowering,lowdown,lounging,lothario,longtime,liposuction,lieutenant's,lidocaine,libbets,lewd,levitate,leslie's,leeway,lectured,lauren's,launcher,launcelot,latent,larek,lagos,lackeys,kumbaya,kryptonite,knapsack,keyhole,kensington,katarangura,kann,junior's,juiced,jugs,joyful,jihad,janitor's,jakey,ironclad,invoice,intertwined,interlude,interferes,insurrection,injure,initiating,infernal,india's,indeedy,incur,incorrigible,incantations,imprint,impediment,immersion,immensely,illustrate,ike's,igloo,idly,ideally,hysterectomy,hyah,house's,hour's,hounded,hooch,honeymoon's,hollering,hogs,hindsight,highs,high's,hiatus,helix,heirs,heebie,havesham,hassan's,hasenfuss,hankering,hangers,hakuna,gutless,gusto,grubbing,grrrr,greg's,grazed,gratification,grandeur,gorak,godammit,gnawing,glanced,gladiators,generating,galahad,gaius,furnished,funeral's,fundamentally,frostbite,frees,frazzled,fraulein,fraternizing,fortuneteller,formaldehyde,followup,foggiest,flunky,flickering,flashbacks,fixtures,firecrackers,fines,filly,figger,fetuses,fella's,feasible,fates,eyeliner,extremities,extradited,expires,experimented,exiting,exhibits,exhibited,exes,excursion,exceedingly,evaporate,erupt,equilibrium,epileptic,ephram's,entrails,entities,emporium,egregious,eggshells,easing,duwayne,drone,droll,dreyfuss,drastically,dovey,doubly,doozy,donkeys,donde,dominate,distrust,distributing,distressing,disintegrate,discreetly,disagreements,diff,dick's,devised,determines,descending,deprivation,delegate,dela,degradation,decision's,decapitated,dealin,deader,dashed,darkroom,dares,daddies,dabble,cycles,cushy,currents,cupcakes,cuffed,croupier,croak,criticized,crapped,coursing,cornerstone,copyright,coolers,continuum,contaminate,cont,consummated,construed,construct,condos,concoction,compulsion,committees,commish,columnist,collapses,coercion,coed,coastal,clemency,clairvoyant,circulate,chords,chesterton,checkered,charlatan,chaperones,categorically,cataracts,carano,capsules,capitalize,cache,butcher's,burdon,bullshitting,bulge,buck's,brewed,brethren,bren,breathless,breasted,brainstorming,bossing,borealis,bonsoir,bobka,boast,blimp,bleu,bleep,bleeder,blackouts,bisque,binford's,billboards,bernie's,beecher's,beatings,bayberry,bashed,bartlet's,bapu,bamboozled,ballon,balding,baklava,baffled,backfires,babak,awkwardness,attributed,attest,attachments,assembling,assaults,asphalt,arthur's,arthritis,armenian,arbitrary,apologizes,anyhoo,antiquated,alcante,agency's,advisable,advertisement,adventurer,abundance,aahhh,aaahh,zatarc,yous,york's,yeti,yellowstone,yearbooks,yakuza,wuddya,wringing,woogie,womanhood,witless,winging,whatsa,wetting,wessex,wendy's,way's,waterproof,wastin,washington's,wary,voom,volition,volcanic,vogelman,vocation,visually,violinist,vindicated,vigilance,viewpoint,vicariously,venza,vasily,validity,vacuuming,utensils,uplink,unveil,unloved,unloading,uninhibited,unattached,ukraine,typo,tweaked,twas,turnips,tunisia,tsch,trinkets,tribune,transmitters,translator,train's,toured,toughen,toting,topside,topical,toothed,tippy,tides,theology,terrors,terrify,tentative,technologically,tarnish,target's,tallest,tailored,tagliati,szpilman,swimmers,swanky,susie's,surly,supple,sunken,summation,suds,suckin,substantially,structured,stockholm,stepmom,squeaking,springfield's,spooks,splashmore,spanked,souffle,solitaire,solicitation,solarium,smooch,smokers,smog,slugged,slobbering,skylight,skimpy,situated,sinuses,simplify,silenced,sideburns,sid's,shutdown,shrinkage,shoddy,shhhhhh,shelling,shelled,shareef,shangri,shakey's,seuss,servicing,serenade,securing,scuffle,scrolls,scoff,scholarships,scanners,sauerkraut,satisfies,satanic,sars,sardines,sarcophagus,santino,sandi's,salvy,rusted,russells,ruby's,rowboat,routines,routed,rotating,rolfsky,ringside,rigging,revered,retreated,respectability,resonance,resembling,reparations,reopened,renewal,renegotiate,reminisce,reluctantly,reimburse,regimen,regaining,rectum,recommends,recognizable,realism,reactive,rawhide,rappaport's,raincoat,quibble,puzzled,pursuits,purposefully,puns,pubic,psychotherapy,prosecution's,proofs,proofing,professor's,prevention,prescribing,prelim,positioning,pore,poisons,poaching,pizza's,pertaining,personalized,personable,peroxide,performs,pentonville,penetrated,peggy's,payphone,payoffs,participated,park's,parisian,palp,paleontology,overhaul,overflowing,organised,oompa,ojai,offenders,oddest,objecting,o'hare,o'daniel,notches,noggin,nobody'd,nitrogen,nightstand,niece's,nicky's,neutralized,nervousness,nerdy,needlessly,navigational,narrative,narc,naquadah,nappy,nantucket,nambla,myriad,mussolini,mulberry,mountaineer,mound,motherfuckin,morrie,monopolizing,mohel,mistreated,misreading,misbehave,miramax,minstrel,minivan,milligram,milkshakes,milestone,middleweight,michelangelo,metamorphosis,mesh,medics,mckinnon's,mattresses,mathesar,matchbook,matata,marys,marco's,malucci,majored,magilla,magic's,lymphoma,lowers,lordy,logistics,linens,lineage,lindenmeyer,limelight,libel,leery's,leased,leapt,laxative,lather,lapel,lamppost,laguardia,labyrinth,kindling,key's,kegs,kegger,kawalsky,juries,judo,jokin,jesminder,janine's,izzy,israeli,interning,insulation,institutionalized,inspected,innings,innermost,injun,infallible,industrious,indulgence,indonesia,incinerator,impossibility,imports,impart,illuminate,iguanas,hypnotic,hyped,huns,housed,hostilities,hospitable,hoses,horton's,homemaker,history's,historian,hirschmuller,highlighted,hideout,helpers,headset,guardianship,guapo,guantanamo,grubby,greyhound,grazing,granola,granddaddy,gotham's,goren,goblet,gluttony,glucose,globes,giorno,gillian's,getter,geritol,gassed,gang's,gaggle,freighter,freebie,frederick's,fractures,foxhole,foundations,fouled,foretold,forcibly,folklore,floorboards,floods,floated,flippers,flavour,flaked,firstly,fireflies,feedings,fashionably,fascism,farragut,fallback,factions,facials,exterminate,exited,existent,exiled,exhibiting,excites,everything'll,evenin,evaluated,ethically,entree,entirety,ensue,enema,empath,embryo,eluded,eloquently,elle,eliminates,eject,edited,edema,echoes,earns,dumpling,drumming,droppings,drazen's,drab,dolled,doll's,doctrine,distasteful,disputing,disputes,displeasure,disdain,disciples,diamond's,develops,deterrent,detection,dehydration,defied,defiance,decomposing,debated,dawned,darken,daredevil,dailies,cyst,custodian,crusts,crucifix,crowning,crier,crept,credited,craze,crawls,coveted,couple's,couldn,corresponding,correcting,corkmaster,copperfield,cooties,coopers,cooperated,controller,contraption,consumes,constituents,conspire,consenting,consented,conquers,congeniality,computerized,compute,completes,complains,communicator,communal,commits,commendable,colonels,collide,coladas,colada,clout,clooney,classmate,classifieds,clammy,claire's,civility,cirrhosis,chink,chemically,characterize,censor,catskills,cath,caterpillar,catalyst,carvers,carts,carpool,carelessness,career's,cardio,carbs,captivity,capeside's,capades,butabi,busmalis,bushel,burping,buren,burdens,bunks,buncha,bulldozers,browse,brockovich,bria,breezy,breeds,breakthroughs,bravado,brandy's,bracket,boogety,bolshevik,blossoms,bloomington,blooming,bloodsucker,blockade,blight,blacksmith,betterton,betrayer,bestseller,bennigan's,belittle,beeps,bawling,barts,bartending,barbed,bankbooks,back's,babs,babish,authors,authenticity,atropine,astronomical,assertive,arterial,armbrust,armageddon,aristotle,arches,anyanka,annoyance,anemic,anck,anago,ali's,algiers,airways,airwaves,air's,aimlessly,ails,ahab,afflicted,adverse,adhere,accuracy,aaargh,aaand,zest,yoghurt,yeast,wyndham's,writings,writhing,woven,workable,winking,winded,widen,whooping,whiter,whip's,whatya,whacko,we's,wazoo,wasp,waived,vlad,virile,vino,vic's,veterinary,vests,vestibule,versed,venetian,vaughn's,vanishes,vacancies,urkel,upwards,uproot,unwarranted,unscheduled,unparalleled,undertaking,undergrad,tweedle,turtleneck,turban,trickery,travolta,transylvania,transponder,toyed,townhouse,tonto,toed,tion,tier,thyself,thunderstorm,thnk,thinning,thinkers,theatres,thawed,tether,tempus,telegraph,technicalities,tau'ri,tarp,tarnished,tara's,taggert's,taffeta,tada,tacked,systolic,symbolize,swerve,sweepstakes,swami,swabs,suspenders,surfers,superwoman,sunsets,sumo,summertime,succulent,successes,subpoenas,stumper,stosh,stomachache,stewed,steppin,stepatech,stateside,starvation,staff's,squads,spicoli,spic,sparing,soulless,soul's,sonnets,sockets,snit,sneaker,snatching,smothering,slush,sloman,slashing,sitters,simpson's,simpleton,signify,signal's,sighs,sidra,sideshow,sickens,shunned,shrunken,showbiz,shopped,shootings,shimmering,shakespeare's,shagging,seventeenth,semblance,segue,sedation,scuzzlebutt,scumbags,scribble,screwin,scoundrels,scarsdale,scamp,scabs,saucers,sanctioned,saintly,saddened,runaways,runaround,rumored,rudimentary,rubies,rsvp,rots,roman's,ripley's,rheya,revived,residing,resenting,researcher,repertoire,rehashing,rehabilitated,regrettable,regimental,refreshed,reese's,redial,reconnecting,rebirth,ravenous,raping,ralph's,railroads,rafting,rache,quandary,pylea,putrid,punitive,puffing,psychopathic,prunes,protests,protestant,prosecutors,proportional,progressed,prod,probate,prince's,primate,predicting,prayin,practitioner,possessing,pomegranate,polgara,plummeting,planners,planing,plaintiffs,plagues,pitt's,pithy,photographer's,philharmonic,petrol,perversion,personals,perpetrators,perm,peripheral,periodic,perfecto,perched,pees,peeps,pedigree,peckish,pavarotti,partnered,palette,pajama,packin,pacifier,oyez,overstepping,outpatient,optimum,okama,obstetrician,nutso,nuance,noun,noting,normalcy,normal's,nonnegotiable,nomak,nobleman,ninny,nines,nicey,newsflash,nevermore,neutered,nether,nephew's,negligee,necrosis,nebula,navigating,narcissistic,namesake,mylie,muses,munitions,motivational,momento,moisturizer,moderation,mmph,misinformed,misconception,minnifield,mikkos,methodical,mechanisms,mebbe,meager,maybes,matchmaking,masry,markovic,manifesto,malakai,madagascar,m'am,luzhin,lusting,lumberjack,louvre,loopholes,loaning,lightening,liberals,lesbo,leotard,leafs,leader's,layman's,launder,lamaze,kubla,kneeling,kilo,kibosh,kelp,keith's,jumpsuit,joy's,jovi,joliet,jogger,janover,jakovasaurs,irreparable,intervened,inspectors,innovation,innocently,inigo,infomercial,inexplicable,indispensable,indicative,incognito,impregnated,impossibly,imperfect,immaculate,imitating,illnesses,icarus,hunches,hummus,humidity,housewives,houmfort,hothead,hostiles,hooves,hoopla,hooligans,homos,homie,hisself,himalayas,hidy,hickory,heyyy,hesitant,hangout,handsomest,handouts,haitian,hairless,gwennie,guzzling,guinevere,grungy,grunge,grenada,gout,gordon's,goading,gliders,glaring,geology,gems,gavel,garments,gardino,gannon's,gangrene,gaff,gabrielle's,fundraising,fruitful,friendlier,frequencies,freckle,freakish,forthright,forearm,footnote,footer,foot's,flops,flamenco,fixer,firm's,firecracker,finito,figgered,fezzik,favourites,fastened,farfetched,fanciful,familiarize,faire,failsafe,fahrenheit,fabrication,extravaganza,extracted,expulsion,exploratory,exploitation,explanatory,exclusion,evolutionary,everglades,evenly,eunuch,estas,escapade,erasers,entries,enforcing,endorsements,enabling,emptying,emperor's,emblem,embarassing,ecosystem,ebby,ebay,dweeb,dutiful,dumplings,drilled,drafty,doug's,dolt,dollhouse,displaced,dismissing,disgraced,discrepancies,disbelief,disagreeing,disagreed,digestion,didnt,deviled,deviated,deterioration,departmental,departing,demoted,demerol,delectable,deco,decaying,decadent,dears,daze,dateless,d'algout,cultured,cultivating,cryto,crusades,crumpled,crumbled,cronies,critters,crew's,crease,craves,cozying,cortland,corduroy,cook's,consumers,congratulated,conflicting,confidante,condensed,concessions,compressor,compressions,compression,complicating,complexity,compadre,communicated,coerce,coding,coating,coarse,clown's,clockwise,clerk's,classier,clandestine,chums,chumash,christopher's,choreography,choirs,chivalrous,chinpoko,chilean,chihuahua,cheerio,charred,chafing,celibacy,casts,caste,cashier's,carted,carryin,carpeting,carp,carotid,cannibals,candor,caen,cab's,butterscotch,busts,busier,bullcrap,buggin,budding,brookside,brodski,bristow's,brig,bridesmaid's,brassiere,brainwash,brainiac,botrelle,boatload,blimey,blaring,blackness,bipolar,bipartisan,bins,bimbos,bigamist,biebe,biding,betrayals,bestow,bellerophon,beefy,bedpans,battleship,bathroom's,bassinet,basking,basin,barzini,barnyard,barfed,barbarian,bandit,balances,baker's,backups,avid,augh,audited,attribute,attitudes,at's,astor,asteroids,assortment,associations,asinine,asalaam,arouse,architects,aqua,applejack,apparatus,antiquities,annoys,angela's,anew,anchovies,anchors,analysts,ampule,alphabetically,aloe,allure,alameida,aisles,airfield,ahah,aggressively,aggravate,aftermath,affiliation,aesthetic,advertised,advancing,adept,adage,accomplices,accessing,academics,aagh,zoned,zoey's,zeal,yokel,y'ever,wynant's,wringer,witwer,withdrew,withdrawing,withdrawals,windward,wimbledon,wily,willfully,whorfin,whimsical,whimpering,welding,weddin,weathered,wealthiest,weakening,warmest,wanton,waif,volant,vivo,vive,visceral,vindication,vikram,vigorously,verification,veggies,urinate,uproar,upload,unwritten,unwrap,unsung,unsubstantiated,unspeakably,unscrupulous,unraveling,unquote,unqualified,unfulfilled,undetectable,underlined,unconstitutional,unattainable,unappreciated,ummmm,ulcers,tylenol,tweak,tutu,turnin,turk's,tucker's,tuatha,tropez,trends,trellis,traffic's,torque,toppings,tootin,toodles,toodle,tivo,tinkering,thursday's,thrives,thorne's,thespis,thereafter,theatrics,thatherton,texts,testicle,terr,tempers,teammates,taxpayer,tavington,tampon,tackling,systematic,syndicated,synagogue,swelled,sweeney's,sutures,sustenance,surfaces,superstars,sunflowers,sumatra,sublet,subjective,stubbins,strutting,strewn,streams,stowaway,stoic,sternin,stereotypes,steadily,star's,stalker's,stabilizing,sprang,spotter,spiraling,spinster,spell's,speedometer,specified,speakeasy,sparked,soooo,songwriter,soiled,sneakin,smithereens,smelt,smacks,sloan's,slaughterhouse,slang,slacks,skids,sketching,skateboards,sizzling,sixes,sirree,simplistic,sift,side's,shouts,shorted,shoelace,sheeit,shaw's,shards,shackled,sequestered,selmak,seduces,seclusion,seasonal,seamstress,seabeas,scry,scripted,scotia,scoops,scooped,schillinger's,scavenger,saturation,satch,salaries,safety's,s'more,s'il,rudeness,rostov,romanian,romancing,robo,robert's,rioja,rifkin,rieper,revise,reunions,repugnant,replicating,replacements,repaid,renewing,remembrance,relic,relaxes,rekindle,regulate,regrettably,registering,regenerate,referenced,reels,reducing,reconstruct,reciting,reared,reappear,readin,ratting,rapes,rancho,rancher,rammed,rainstorm,railroading,queers,punxsutawney,punishes,pssst,prudy,proudest,protectors,prohibits,profiling,productivity,procrastinating,procession,proactive,priss,primaries,potomac,postmortem,pompoms,polio,poise,piping,pickups,pickings,physiology,philanthropist,phenomena,pheasant,perfectionist,peretti,people'll,peninsula,pecking,peaks,pave,patrolman,participant,paralegal,paragraphs,paparazzi,pankot,pampering,pain's,overstep,overpower,ovation,outweigh,outlawed,orion's,openness,omnipotent,oleg,okra,okie,odious,nuwanda,nurtured,niles's,newsroom,netherlands,nephews,neeson,needlepoint,necklaces,neato,nationals,muggers,muffler,mousy,mourned,mosey,morn,mormon,mopey,mongolians,moldy,moderately,modelling,misinterpret,minneapolis,minion,minibar,millenium,microfilm,metals,mendola,mended,melissande,me's,mathematician,masturbating,massacred,masbath,marler's,manipulates,manifold,malp,maimed,mailboxes,magnetism,magna,m'lord,m'honey,lymph,lunge,lull,luka,lt's,lovelier,loser's,lonigan's,lode,locally,literacy,liners,linear,lefferts,leezak,ledgers,larraby,lamborghini,laloosh,kundun,kozinski,knockoff,kissin,kiosk,khasinau's,kennedys,kellman,karlo,kaleidoscope,jumble,juggernaut,joseph's,jiminy,jesuits,jeffy,jaywalking,jailbird,itsy,irregularities,inventive,introduces,interpreter,instructing,installing,inquest,inhabit,infraction,informer,infarction,incidence,impulsively,impressing,importing,impersonated,impeach,idiocy,hyperbole,hydra,hurray,hungary,humped,huhuh,hsing,hotspot,horsepower,hordes,hoodlums,honky,hitchhiker,hind,hideously,henchmen,heaving,heathrow,heather's,heathcliff,healthcare,headgear,headboard,hazing,hawking,harem,handprint,halves,hairspray,gutiurrez,greener,grandstand,goosebumps,good's,gondola,gnaw,gnat,glitches,glide,gees,gasping,gases,garrison's,frolic,fresca,freeways,frayed,fortnight,fortitude,forgetful,forefathers,foley's,foiled,focuses,foaming,flossing,flailing,fitzgeralds,firehouse,finders,filmmakers,fiftieth,fiddler,fellah,feats,fawning,farquaad,faraway,fancied,extremists,extremes,expresses,exorcist,exhale,excel,evaluations,ethros,escalated,epilepsy,entrust,enraged,ennui,energized,endowment,encephalitis,empties,embezzling,elster,ellie's,ellen's,elixir,electrolytes,elective,elastic,edged,econ,eclectic,eagle's,duplex,dryers,drexl,dredging,drawback,drafting,don'ts,docs,dobisch,divorcee,ditches,distinguishing,distances,disrespected,disprove,disobeying,disobedience,disinfectant,discs,discoveries,dips,diplomas,dingy,digress,dignitaries,digestive,dieting,dictatorship,dictating,devoured,devise,devane's,detonators,detecting,desist,deserter,derriere,deron,derive,derivative,delegates,defects,defeats,deceptive,debilitating,deathwok,dat's,darryl's,dago,daffodils,curtsy,cursory,cuppa,cumin,cultivate,cujo,cubic,cronkite,cremation,credence,cranking,coverup,courted,countin,counselling,cornball,converting,contentment,contention,contamination,consortium,consequently,consensual,consecutive,compressed,compounds,compost,components,comparative,comparable,commenting,color's,collections,coleridge,coincidentally,cluett,cleverly,cleansed,cleanliness,clea,clare's,citizen's,chopec,chomp,cholera,chins,chime,cheswick,chessler,cheapest,chatted,cauliflower,catharsis,categories,catchin,caress,cardigan,capitalism,canopy,cana,camcorder,calorie,cackling,cabot's,bystanders,buttoned,buttering,butted,buries,burgel,bullpen,buffoon,brogna,brah,bragged,boutros,boosted,bohemian,bogeyman,boar,blurting,blurb,blowup,bloodhound,blissful,birthmark,biotech,bigot,bestest,benefited,belted,belligerent,bell's,beggin,befall,beeswax,beer's,becky's,beatnik,beaming,bazaar,bashful,barricade,banners,bangers,baja,baggoli,badness,awry,awoke,autonomy,automobiles,attica,astoria,assessing,ashram,artsy,artful,aroun,armpits,arming,arithmetic,annihilate,anise,angiogram,andre's,anaesthetic,amorous,ambiguous,ambiance,alligators,afforded,adoration,admittance,administering,adama,aclu,abydos,absorption,zonked,zhivago,zealand,zazu,youngster,yorkin,wrongfully,writin,wrappers,worrywart,woops,wonderfalls,womanly,wickedness,wichita,whoopie,wholesale,wholeheartedly,whimper,which'll,wherein,wheelchairs,what'ya,west's,wellness,welcomes,wavy,warren's,warranted,wankers,waltham,wallop,wading,wade's,wacked,vogue,virginal,vill,vets,vermouth,vermeil,verger,verbs,verbally,ventriss,veneer,vecchio's,vampira,utero,ushers,urgently,untoward,unshakable,unsettled,unruly,unrest,unmanned,unlocks,unified,ungodly,undue,undermined,undergoing,undergo,uncooperative,uncontrollably,unbeatable,twitchy,tunh,tumbler,tubs,truest,troublesome,triumphs,triplicate,tribbey,trent's,transmissions,tortures,torpedoes,torah,tongaree,tommi,tightening,thunderbolt,thunderbird,thorazine,thinly,theta,theres,testifies,terre,teenaged,technological,tearful,taxing,taldor,takashi,tach,symbolizes,symbolism,syllabus,swoops,swingin,swede,sutra,suspending,supplement,sunday's,sunburn,succumbed,subtitled,substituting,subsidiary,subdued,stuttering,stupor,stumps,strummer,strides,strategize,strangulation,stooped,stipulation,stingy,stigma,stewart's,statistic,startup,starlet,stapled,squeaks,squawking,spoilsport,splicing,spiel,spencers,specifications,spawned,spasms,spaniard,sous,softener,sodding,soapbox,snow's,smoldering,smithbauer,slogans,slicker,slasher,skittish,skepticism,simulated,similarity,silvio,signifies,signaling,sifting,sickest,sicilians,shuffling,shrivel,shortstop,sensibility,sender,seminary,selecting,segretti,seeping,securely,scurrying,scrunch,scrote,screwups,schoolteacher,schibetta's,schenkman,sawing,savin,satine,saps,sapiens,salvaging,salmonella,safeguard,sacrilege,rumpus,ruffle,rube,routing,roughing,rotted,roshman's,rondall,road's,ridding,rickshaw,rialto,rhinestone,reversible,revenues,retina,restrooms,resides,reroute,requisite,repress,replicate,repetition,removes,relationship's,regent,regatta,reflective,rednecks,redeeming,rectory,recordings,reasoned,rayed,ravell,raked,rainstorm's,raincheck,raids,raffi,racked,query,quantities,pushin,prototypes,proprietor,promotes,prometheus,promenade,projectile,progeny,profess,prodding,procure,primetime,presuming,preppy,prednisone,predecessor,potted,posttraumatic,poppies,poorhouse,pool's,polaroid,podiatrist,plucky,plowed,pledging,playroom,playhouse,play's,plait,placate,pitchfork,pissant,pinback,picketing,photographing,pharoah,petrak,petal,persecuting,perchance,penny's,pellets,peeved,peerless,payable,pauses,pathways,pathologist,pat's,parchment,papi,pagliacci,owls,overwrought,overwhelmingly,overreaction,overqualified,overheated,outward,outlines,outcasts,otherworldly,originality,organisms,opinionated,oodles,oftentimes,octane,occured,obstinate,observatory,o'er,nutritionist,nutrition,numbness,nubile,notification,notary,nooooooo,nodes,nobodies,nepotism,neighborhoods,neanderthals,musicals,mushu,murphy's,multimedia,mucus,mothering,mothballs,monogrammed,monk's,molesting,misspoke,misspelled,misconstrued,miscellaneous,miscalculated,minimums,mince,mildew,mighta,middleman,metabolic,messengers,mementos,mellowed,meditate,medicare,mayol,maximilian,mauled,massaged,marmalade,mardi,mannie,mandates,mammals,malaysia,makings,major's,maim,lundegaard,lovingly,lout,louisville,loudest,lotto,loosing,loompa,looming,longs,lodging,loathes,littlest,littering,linebacker,lifelike,li'l,legalities,lavery's,laundered,lapdog,lacerations,kopalski,knobs,knitted,kittridge,kidnaps,kerosene,katya,karras,jungles,juke,joes,jockeys,jeremy's,jefe,janeiro,jacqueline's,ithaca,irrigation,iranoff,invoices,invigorating,intestinal,interactive,integration,insolence,insincere,insectopia,inhumane,inhaling,ingrates,infrastructure,infestation,infants,individuality,indianapolis,indeterminate,indefinite,inconsistent,incomprehensible,inaugural,inadequacy,impropriety,importer,imaginations,illuminating,ignited,ignite,iggy,i'da,hysterics,hypodermic,hyperventilate,hypertension,hyperactive,humoring,hotdogs,honeymooning,honed,hoist,hoarding,hitching,hinted,hill's,hiker,hijo,hightail,highlands,hemoglobin,helo,hell'd,heinie,hanoi,hags,gush,guerrillas,growin,grog,grissom's,gregory's,grasped,grandparent,granddaughters,gouged,goblins,gleam,glades,gigantor,get'em,geriatric,geared,gawk,gawd,gatekeeper,gargoyles,gardenias,garcon,garbo,gallows,gabe's,gabby's,gabbing,futon,fulla,frightful,freshener,freedoms,fountains,fortuitous,formulas,forceps,fogged,fodder,foamy,flogging,flaun,flared,fireplaces,firefighters,fins,filtered,feverish,favell,fattest,fattening,fate's,fallow,faculties,fabricated,extraordinaire,expressly,expressive,explorers,evade,evacuating,euclid,ethanol,errant,envied,enchant,enamored,enact,embarking,election's,egocentric,eeny,dussander,dunwitty,dullest,dru's,dropout,dredged,dorsia,dormitory,doot,doornail,dongs,dogged,dodgy,do's,ditty,dishonorable,discriminating,discontinue,dings,dilly,diffuse,diets,dictation,dialysis,deteriorated,delly,delightfully,definitions,decreased,declining,deadliest,daryll,dandruff,cynthia's,cush,cruddy,croquet,crocodiles,cringe,crimp,credo,cranial,crackling,coyotes,courtside,coupling,counteroffer,counterfeiting,corrupting,corrective,copter,copping,conway's,conveyor,contusions,contusion,conspirator,consoling,connoisseur,conjecture,confetti,composure,competitor,compel,commanders,coloured,collector's,colic,coldest,coincide,coddle,cocksuckers,coax,coattails,cloned,cliff's,clerical,claustrophobia,classrooms,clamoring,civics,churn,chugga,chromosomes,christened,chopper's,chirping,chasin,characterized,chapped,chalkboard,centimeter,caymans,catheter,caspian,casings,cartilage,carlton's,card's,caprica,capelli,cannolis,cannoli,canals,campaigns,camogli,camembert,butchers,butchered,busboys,bureaucrats,bungalow,buildup,budweiser,buckled,bubbe,brownstone,bravely,brackley,bouquets,botox,boozing,boosters,bodhi,blunders,blunder,blockage,blended,blackberry,bitch's,birthplace,biocyte,biking,bike's,betrays,bestowed,bested,beryllium,beheading,beginner's,beggar,begbie,beamed,bayou,bastille,bask,barstool,barricades,baron's,barbecues,barbecued,barb's,bandwagon,bandits,ballots,ballads,backfiring,bacarra,avoidance,avenged,autopsies,austrian,aunties,attache,atrium,associating,artichoke,arrowhead,arrivals,arose,armory,appendage,apostrophe,apostles,apathy,antacid,ansel,anon,annul,annihilation,andrew's,anderson's,anastasia's,amuses,amped,amicable,amendments,amberg,alluring,allotted,alfalfa,alcoholism,airs,ailing,affinity,adversaries,admirers,adlai,adjective,acupuncture,acorn,abnormality,aaaahhhh,zooming,zippity,zipping,zeroed,yuletide,yoyodyne,yengeese,yeahhh,xena,wrinkly,wracked,wording,withered,winks,windmills,widow's,whopping,wholly,wendle,weigart,weekend's,waterworks,waterford,waterbed,watchful,wantin,wally's,wail,wagging,waal,waaah,vying,voter,ville,vertebrae,versatile,ventures,ventricle,varnish,vacuumed,uugh,utilities,uptake,updating,unreachable,unprovoked,unmistakable,unky,unfriendly,unfolding,undesirable,undertake,underpaid,uncuff,unchanged,unappealing,unabomber,ufos,tyres,typhoid,tweek's,tuxedos,tushie,turret,turds,tumnus,tude,truman's,troubadour,tropic,trinium,treaters,treads,transpired,transient,transgression,tournaments,tought,touchdowns,totem,tolstoy,thready,thins,thinners,thas,terrible's,television's,techs,teary,tattaglia,tassels,tarzana,tape's,tanking,tallahassee,tablecloths,synonymous,synchronize,symptomatic,symmetrical,sycophant,swimmingly,sweatshop,surrounds,surfboard,superpowers,sunroom,sunflower,sunblock,sugarplum,sudan,subsidies,stupidly,strumpet,streetcar,strategically,strapless,straits,stooping,stools,stifler,stems,stealthy,stalks,stairmaster,staffer,sshhh,squatting,squatters,spores,spelt,spectacularly,spaniel,soulful,sorbet,socked,society's,sociable,snubbed,snub,snorting,sniffles,snazzy,snakebite,smuggler,smorgasbord,smooching,slurping,sludge,slouch,slingshot,slicer,slaved,skimmed,skier,sisterhood,silliest,sideline,sidarthur,shrink's,shipwreck,shimmy,sheraton,shebang,sharpening,shanghaied,shakers,sendoff,scurvy,scoliosis,scaredy,scaled,scagnetti,saxophone,sawchuk,saviour,saugus,saturated,sasquatch,sandbag,saltines,s'pose,royalties,routinely,roundabout,roston,rostle,riveting,ristle,righ,rifling,revulsion,reverently,retrograde,restriction,restful,resolving,resents,rescinded,reptilian,repository,reorganize,rentals,rent's,renovating,renal,remedies,reiterate,reinvent,reinmar,reibers,reechard,recuse,recorders,record's,reconciling,recognizance,recognised,reclaiming,recitation,recieved,rebate,reacquainted,rations,rascals,raptors,railly,quintuplets,quahog,pygmies,puzzling,punctuality,psychoanalysis,psalm,prosthetic,proposes,proms,proliferation,prohibition,probie,printers,preys,pretext,preserver,preppie,prag,practise,postmaster,portrayed,pollen,polled,poachers,plummet,plumbers,pled,plannin,pitying,pitfalls,piqued,pinecrest,pinches,pillage,pigheaded,pied,physique,pessimistic,persecute,perjure,perch,percentile,pentothal,pensky,penises,peking,peini,peacetime,pazzi,pastels,partisan,parlour,parkway,parallels,paperweight,pamper,palsy,palaces,pained,overwhelm,overview,overalls,ovarian,outrank,outpouring,outhouse,outage,ouija,orbital,old's,offset,offer's,occupying,obstructed,obsessions,objectives,obeying,obese,o'riley,o'neal,o'higgins,nylon,notoriously,nosebleeds,norman's,norad,noooooooo,nononono,nonchalant,nominal,nome,nitrous,nippy,neurosis,nekhorvich,necronomicon,nativity,naquada,nano,nani,n'est,mystik,mystified,mums,mumps,multinational,muddle,mothership,moped,monumentally,monogamous,mondesi,molded,mixes,misogynistic,misinterpreting,miranda's,mindlock,mimic,midtown,microphones,mending,megaphone,meeny,medicating,meanings,meanie,masseur,maru,marshal's,markstrom,marklars,mariachi,margueritas,manifesting,maintains,mail's,maharajah,lurk,lulu's,lukewarm,loveliest,loveable,lordship,looting,lizardo,liquored,lipped,lingers,limey,limestone,lieutenants,lemkin,leisurely,laureate,lathe,latched,lars,lapping,ladle,kuala,krevlorneswath,kosygin,khakis,kenaru,keats,kath,kaitlan,justin's,julliard,juliet's,journeys,jollies,jiff,jaundice,jargon,jackals,jabot's,invoked,invisibility,interacting,instituted,insipid,innovative,inflamed,infinitely,inferiority,inexperience,indirectly,indications,incompatible,incinerated,incinerate,incidental,incendiary,incan,inbred,implicitly,implicating,impersonator,impacted,ida's,ichiro,iago,hypo,hurricanes,hunks,host's,hospice,horsing,hooded,honey's,homestead,hippopotamus,hindus,hiked,hetson,hetero,hessian,henslowe,hendler,hellstrom,hecate,headstone,hayloft,hater,hast,harold's,harbucks,handguns,hallucinate,halliwell's,haldol,hailing,haggling,hadj,gynaecologist,gumball,gulag,guilder,guaranteeing,groundskeeper,ground's,grindstone,grimoir,grievance,griddle,gribbit,greystone,graceland,gooders,goeth,glossy,glam,giddyup,gentlemanly,gels,gelatin,gazelle,gawking,gaulle,gate's,ganged,fused,fukes,fromby,frenchmen,franny,foursome,forsley,foreman's,forbids,footwork,foothold,fonz,fois,foie,floater,flinging,flicking,fittest,fistfight,fireballs,filtration,fillings,fiddling,festivals,fertilization,fennyman,felonious,felonies,feces,favoritism,fatten,fanfare,fanatics,faceman,extensions,executions,executing,excusing,excepted,examiner's,ex's,evaluating,eugh,erroneous,enzyme,envoy,entwined,entrances,ensconced,enrollment,england's,enemy's,emit,emerges,embankment,em's,ellison's,electrons,eladio,ehrlichman,easterland,dylan's,dwellers,dueling,dubbed,dribbling,drape,doze,downtrodden,doused,dosed,dorleen,dopamine,domesticated,dokie,doggone,disturbances,distort,displeased,disown,dismount,disinherited,disarmed,disapproves,disabilities,diperna,dioxide,dined,diligent,dicaprio,diameter,dialect,detonated,destitute,designate,depress,demolish,demographics,degraded,deficient,decoded,debatable,dealey,darsh,dapper,damsels,damning,daisy's,dad'll,d'oeuvre,cutter's,curlers,curie,cubed,cryo,critically,crikey,crepes,crackhead,countrymen,count's,correlation,cornfield,coppers,copilot,copier,coordinating,cooing,converge,contributor,conspiracies,consolidated,consigliere,consecrated,configuration,conducts,condoning,condemnation,communities,commoner,commies,commented,comical,combust,comas,colds,clod,clique,clay's,clawed,clamped,cici,christianity,choosy,chomping,chimps,chigorin,chianti,cheval,chet's,cheep,checkups,check's,cheaters,chase's,charted,celibate,cautiously,cautionary,castell,carpentry,caroling,carjacking,caritas,caregiver,cardiology,carb,capturing,canteen,candlesticks,candies,candidacy,canasta,calendars,cain't,caboose,buster's,burro,burnin,buon,bunking,bumming,bullwinkle,budgets,brummel,brooms,broadcasts,britt's,brews,breech,breathin,braslow,bracing,bouts,botulism,bosnia,boorish,bluenote,bloodless,blayne,blatantly,blankie,birdy,bene,beetles,bedbugs,becuase,becks,bearers,bazooka,baywatch,bavarian,baseman,bartender's,barrister,barmaid,barges,bared,baracus,banal,bambino,baltic,baku,bakes,badminton,bacon's,backpacks,authorizing,aurelius,attentions,atrocious,ativan,athame,asunder,astound,assuring,aspirins,asphyxiation,ashtrays,aryans,artistry,arnon,aren,approximate,apprehension,appraisal,applauding,anya's,anvil,antiquing,antidepressants,annoyingly,amputate,altruistic,alotta,allegation,alienation,algerian,algae,alerting,airport's,aided,agricultural,afterthought,affront,affirm,adapted,actuality,acoustics,acoustic,accumulate,accountability,abysmal,absentee,zimm,yves,yoohoo,ymca,yeller,yakushova,wuzzy,wriggle,worrier,workmen,woogyman,womanizer,windpipe,windex,windbag,willy's,willin,widening,whisking,whimsy,wendall,weeny,weensy,weasels,watery,watcha,wasteful,waski,washcloth,wartime,waaay,vowel,vouched,volkswagen,viznick,visuals,visitor's,veteran's,ventriloquist,venomous,vendors,vendettas,veils,vehicular,vayhue,vary,varies,van's,vamanos,vadimus,uuhh,upstage,uppity,upheaval,unsaid,unlocking,universally,unintentionally,undisputed,undetected,undergraduate,undergone,undecided,uncaring,unbearably,twos,tween,tuscan,turkey's,tumor's,tryout,trotting,tropics,trini,trimmings,trickier,tree's,treatin,treadstone,trashcan,transports,transistor,transcendent,tramps,toxicity,townsfolk,torturous,torrid,toothpicks,tombs,tolerable,toenail,tireless,tiptoeing,tins,tinkerbell,tink,timmay,tillinghouse,tidying,tibia,thumbing,thrusters,thrashing,thompson's,these'll,testicular,terminology,teriyaki,tenors,tenacity,tellers,telemetry,teas,tea's,tarragon,taliban,switchblade,swicker,swells,sweatshirts,swatches,swatch,swapped,suzanne's,surging,supremely,suntan,sump'n,suga,succumb,subsidize,subordinate,stumbles,stuffs,stronghold,stoppin,stipulate,stewie's,stenographer,steamroll,stds,stately,stasis,stagger,squandered,splint,splendidly,splatter,splashy,splashing,spectra's,specter,sorry's,sorcerers,soot,somewheres,somber,solvent,soldier's,soir,snuggled,snowmobile,snowball's,sniffed,snake's,snags,smugglers,smudged,smirking,smearing,slings,sleet,sleepovers,sleek,slackers,skirmish,siree,siphoning,singed,sincerest,signifying,sidney's,sickened,shuffled,shriveled,shorthanded,shittin,shish,shipwrecked,shins,shingle,sheetrock,shawshank,shamu,sha're,servitude,sequins,seinfeld's,seat's,seascape,seam,sculptor,scripture,scrapings,scoured,scoreboard,scorching,sciences,sara's,sandpaper,salvaged,saluting,salud,salamander,rugrats,ruffles,ruffled,rudolph's,router,roughnecks,rougher,rosslyn,rosses,rosco's,roost,roomy,romping,romeo's,robs,roadie,ride's,riddler,rianna's,revolutionize,revisions,reuniting,retake,retaining,restitution,restaurant's,resorts,reputed,reprimanded,replies,renovate,remnants,refute,refrigerated,reforms,reeled,reefs,reed's,redundancies,rectangle,rectal,recklessly,receding,reassignment,rearing,reapers,realms,readout,ration,raring,ramblings,racetrack,raccoons,quoi,quell,quarantined,quaker,pursuant,purr,purging,punters,pulpit,publishers,publications,psychologists,psychically,provinces,proust,protocols,prose,prophets,project's,priesthood,prevailed,premarital,pregnancies,predisposed,precautionary,poppin,pollute,pollo,podunk,plums,plaything,plateau,pixilated,pivot,pitting,piranhas,pieced,piddles,pickled,picker,photogenic,phosphorous,phases,pffft,petey's,pests,pestilence,pessimist,pesos,peruvian,perspiration,perps,penticoff,pedals,payload,passageways,pardons,paprika,paperboy,panics,pancamo,pam's,paleontologist,painting's,pacifist,ozzie,overwhelms,overstating,overseeing,overpaid,overlap,overflow,overdid,outspoken,outlive,outlaws,orthodontist,orin,orgies,oreos,ordover,ordinates,ooooooh,oooohhh,omelettes,officiate,obtuse,obits,oakwood,nymph,nutritional,nuremberg,nozzle,novocaine,notable,noooooooooo,node,nipping,nilly,nikko,nightstick,nicaragua,neurology,nelson's,negate,neatness,natured,narrowly,narcotic,narcissism,napoleon's,nana's,namun,nakatomi,murky,muchacho,mouthwash,motzah,motherfucker's,mortar,morsel,morrison's,morph,morlocks,moreover,mooch,monoxide,moloch,molest,molding,mohra,modus,modicum,mockolate,mobility,missionaries,misdemeanors,miscalculation,minorities,middies,metric,mermaids,meringue,mercilessly,merchandising,ment,meditating,me'n,mayakovsky,maximillian,martinique,marlee,markovski,marissa's,marginal,mansions,manitoba,maniacal,maneuvered,mags,magnificence,maddening,lyrical,lutze,lunged,lovelies,lou's,lorry,loosening,lookee,liver's,liva,littered,lilac,lightened,lighted,licensing,lexington,lettering,legality,launches,larvae,laredo,landings,lancelot's,laker,ladyship's,laces,kurzon,kurtzweil,kobo,knowledgeable,kinship,kind've,kimono,kenji,kembu,keanu,kazuo,kayaking,juniors,jonesing,joad,jilted,jiggling,jewelers,jewbilee,jeffrey's,jamey's,jacqnoud,jacksons,jabs,ivories,isnt,irritation,iraqis,intellectuals,insurmountable,instances,installments,innocuous,innkeeper,inna,influencing,infantery,indulged,indescribable,incorrectly,incoherent,inactive,inaccurate,improperly,impervious,impertinent,imperfections,imhotep,ideology,identifies,i'il,hymns,huts,hurdles,hunnert,humpty,huffy,hourly,horsies,horseradish,hooo,honours,honduras,hollowed,hogwash,hockley,hissing,hiromitsu,hierarchy,hidin,hereafter,helpmann,haughty,happenings,hankie,handsomely,halliwells,haklar,haise,gunsights,gunn's,grossly,grossed,grope,grocer,grits,gripping,greenpeace,granddad's,grabby,glorificus,gizzard,gilardi,gibarian,geminon,gasses,garnish,galloping,galactic,gairwyn,gail's,futterman,futility,fumigated,fruitless,friendless,freon,fraternities,franc,fractions,foxes,foregone,forego,foliage,flux,floored,flighty,fleshy,flapjacks,fizzled,fittings,fisherman's,finalist,ficus,festering,ferragamo's,federation,fatalities,farbman,familial,famed,factual,fabricate,eyghon,extricate,exchanges,exalted,evolving,eventful,esophagus,eruption,envision,entre,enterprising,entail,ensuring,enrolling,endor,emphatically,eminent,embarrasses,electroshock,electronically,electrodes,efficiently,edinburgh,ecstacy,ecological,easel,dwarves,duffle,drumsticks,drake's,downstream,downed,dollface,divas,distortion,dissent,dissection,dissected,disruptive,disposing,disparaging,disorientation,disintegrated,discounts,disarming,dictated,devoting,deviation,detective's,dessaline,deprecating,deplorable,delve,deity,degenerative,deficiencies,deduct,decomposed,deceased's,debbie's,deathly,dearie,daunting,dankova,czechoslovakia,cyclotron,cyberspace,cutbacks,cusp,culpable,cuddled,crypto,crumpets,cruises,cruisers,cruelly,crowns,crouching,cristo,crip,criminology,cranium,cramming,cowering,couric,counties,cosy,corky's,cordesh,conversational,conservatory,conklin's,conducive,conclusively,competitions,compatibility,coeur,clung,cloud's,clotting,cleanest,classify,clambake,civilizations,cited,cipher,cinematic,chlorine,chipping,china's,chimpanzee,chests,checkpoints,cheapen,chainsaws,censure,censorship,cemeteries,celebrates,ceej,cavities,catapult,cassettes,cartridge,caravaggio,carats,captivating,cancers,campuses,campbell's,calrissian,calibre,calcutta,calamity,butt's,butlers,busybody,bussing,bureau's,bunion,bundy's,bulimic,bulgaria,budging,brung,browbeat,brokerage,brokenhearted,brecher,breakdowns,braun's,bracebridge,boyhood,botanical,bonuses,boning,blowhard,bloc,blisters,blackboard,blackbird,births,birdies,bigotry,biggy,bibliography,bialy,bhamra,bethlehem,bet's,bended,belgrade,begat,bayonet,bawl,battering,baste,basquiat,barrymore,barrington's,barricaded,barometer,balsom's,balled,ballast,baited,badenweiler,backhand,aztec,axle,auschwitz,astrophysics,ascenscion,argumentative,arguably,arby's,arboretum,aramaic,appendicitis,apparition,aphrodite,anxiously,antagonistic,anomalies,anne's,angora,anecdotes,anand,anacott,amniotic,amenities,ambience,alonna,aleck,albert's,akashic,airing,ageless,afro,affiliates,advertisers,adobe,adjustable,acrobat,accommodation,accelerating,absorbing,abouts,abortions,abnormalities,aawwww,aaaaarrrrrrggghhh,zuko's,zoloft,zendi,zamboni,yuppies,yodel,y'hear,wyck,wrangle,wounding,worshippers,worker's,worf,wombosi,wittle,withstanding,wisecracks,williamsburg,wilder's,wiggly,wiggling,wierd,whittlesley,whipper,whattya,whatsamatter,whatchamacallit,whassup,whad'ya,weighted,weakling,waxy,waverly,wasps,warhol,warfarin,waponis,wampum,walled,wadn't,waco,vorash,vogler's,vizzini,visas,virtucon,viridiana,veve,vetoed,vertically,veracity,ventricular,ventilated,varicose,varcon,vandalized,vampire's,vamos,vamoose,val's,vaccinated,vacationing,usted,urinal,uppers,upkeep,unwittingly,unsigned,unsealed,unplanned,unhinged,unhand,unfathomable,unequivocally,unearthed,unbreakable,unanimously,unadvisedly,udall,tynacorp,twisty,tuxes,tussle,turati,tunic,tubing,tsavo,trussed,troublemakers,trollop,trip's,trinket,trilogy,tremors,trekkie,transsexual,transitional,transfusions,tractors,toothbrushes,toned,toke,toddlers,titan's,tita,tinted,timon,timeslot,tightened,thundering,thorpey,thoracic,this'd,thespian,therapist's,theorem,thaddius,texan,tenuous,tenths,tenement,telethon,teleprompter,technicolor,teaspoon,teammate,teacup,taunted,tattle,tardiness,taraka,tappy,tapioca,tapeworm,tanith,tandem,talons,talcum,tais,tacks,synchronized,swivel,swig,swaying,swann's,suppression,supplements,superpower,summed,summarize,sumbitch,sultry,sulfur,sues,subversive,suburbia,substantive,styrofoam,stylings,struts,strolls,strobe,streaks,strategist,stockpile,stewardesses,sterilized,sterilize,stealin,starred,stakeouts,stad,squawk,squalor,squabble,sprinkled,sportsmanship,spokes,spiritus,spectators,specialties,sparklers,spareribs,sowing,sororities,sorbonne,sonovabitch,solicit,softy,softness,softening,socialite,snuggling,snatchers,snarling,snarky,snacking,smythe's,smears,slumped,slowest,slithering,sleepers,sleazebag,slayed,slaughtering,skynet,skidded,skated,sivapathasundaram,sitter's,sitcoms,sissies,sinai,silliness,silences,sidecar,sicced,siam,shylock,shtick,shrugged,shriek,shredder,shoves,should'a,shorten,shortcake,shockingly,shirking,shelly's,shedding,shaves,shatner,sharpener,shapely,shafted,sexless,sequencing,septum,semitic,selflessness,sega,sectors,seabea,scuff,screwball,screened,scoping,scooch,scolding,scholarly,schnitzel,schemed,scalper,sayings,saws,sashimi,santy,sankara,sanest,sanatorium,sampled,samoan,salzburg,saltwater,salma,salesperson,sakulos,safehouse,sabers,rwanda,ruth's,runes,rumblings,rumbling,ruijven,roxie's,round's,ringers,rigorous,righto,rhinestones,reviving,retrieving,resorted,reneging,remodelling,reliance,relentlessly,relegated,relativity,reinforced,reigning,regurgitate,regulated,refills,referencing,reeking,reduces,recreated,reclusive,recklessness,recanted,ranges,ranchers,rallied,rafer,racy,quintet,quaking,quacks,pulses,provision,prophesied,propensity,pronunciation,programmer,profusely,procedural,problema,principals,prided,prerequisite,preferences,preceded,preached,prays,postmark,popsicles,poodles,pollyanna,policing,policeman's,polecat,polaroids,polarity,pokes,poignant,poconos,pocketful,plunging,plugging,pleeease,pleaser,platters,pitied,pinetti,piercings,phyllis's,phooey,phonies,pestering,periscope,perennial,perceptions,pentagram,pelts,patronized,parliamentary,paramour,paralyze,paraguay,parachutes,pancreatic,pales,paella,paducci,oxymoron,owatta,overpass,overgrown,overdone,overcrowded,overcompensating,overcoming,ostracized,orphaned,organise,organisation,ordinate,orbiting,optometrist,oprah's,operandi,oncology,on's,omoc,omens,okayed,oedipal,occupants,obscured,oboe,nuys,nuttier,nuptial,nunheim,noxious,nourish,notepad,notation,nordic,nitroglycerin,niki's,nightmare's,nightlife,nibblet,neuroses,neighbour's,navy's,nationally,nassau,nanosecond,nabbit,mythic,murdock's,munchkins,multiplied,multimillion,mulroney,mulch,mucous,muchas,moxie,mouth's,mountaintop,mounds,morlin,mongorians,moneymaker,moneybags,monde,mom'll,molto,mixup,mitchell's,misgivings,misery's,minerals,mindset,milo's,michalchuk,mesquite,mesmerized,merman,mensa,megan's,media's,meaty,mbwun,materialize,materialistic,mastery,masterminded,mastercard,mario's,marginally,mapuhe,manuscripts,manny's,malvern,malfunctioning,mahatma,mahal,magnify,macnamara,macinerney,machinations,macarena,macadamia,lysol,luxembourg,lurks,lumpur,luminous,lube,lovelorn,lopsided,locator,lobbying,litback,litany,linea,limousines,limo's,limes,lighters,liechtenstein,liebkind,lids,libya,levity,levelheaded,letterhead,lester's,lesabre,leron,lepers,legions,lefts,leftenant,learner's,laziness,layaway,laughlan,lascivious,laryngitis,laptops,lapsed,laos,landok,landfill,laminated,laden,ladders,labelled,kyoto,kurten,kobol,koala,knucklehead,knowed,knotted,kit's,kinsa,kiln,kickboxing,karnovsky,karat,kacl's,judiciary,judaism,journalistic,jolla,joked,jimson,jettison,jet's,jeric,jeeves,jay's,jawed,jankis,janitors,janice's,jango,jamaican,jalopy,jailbreak,jackers,jackasses,j'ai,ivig,invalidate,intoxicated,interstellar,internationally,intercepting,intercede,integrate,instructors,insinuations,insignia,inn's,inflicting,infiltrated,infertile,ineffective,indies,indie,impetuous,imperialist,impaled,immerse,immaterial,imbeciles,imam,imagines,idyllic,idolized,icebox,i'd've,hypochondriac,hyphen,hydraulic,hurtling,hurried,hunchback,hums,humid,hullo,hugger,hubby's,howard's,hostel,horsting,horned,hoooo,homies,homeboys,hollywood's,hollandaise,hoity,hijinks,heya,hesitates,herrero,herndorff,hemp,helplessly,heeyy,heathen,hearin,headband,harv,harrassment,harpies,harmonious,harcourt,harbors,hannah's,hamstring,halstrom,hahahahaha,hackett's,hacer,gunmen,guff,grumbling,grimlocks,grift,greets,grandmothers,grander,granddaughter's,gran's,grafts,governing,gordievsky,gondorff,godorsky,goddesses,glscripts,gillman's,geyser,gettysburg,geological,gentlemen's,genome,gauntlet,gaudy,gastric,gardeners,gardener's,gandolf,gale's,gainful,fuses,fukienese,fucker's,frizzy,freshness,freshening,freb,fraught,frantically,fran's,foxbooks,fortieth,forked,forfeited,forbidding,footed,foibles,flunkies,fleur,fleece,flatbed,flagship,fisted,firefight,fingerpaint,fined,filibuster,fiancee's,fhloston,ferrets,fenceline,femur,fellow's,fatigues,farmhouse,fanucci,fantastically,familiars,falafel,fabulously,eyesore,extracting,extermination,expedient,expectancy,exiles,executor,excluding,ewwww,eviscerated,eventual,evac,eucalyptus,ethnicity,erogenous,equestrian,equator,epidural,enrich,endeavors,enchante,embroidered,embarassed,embarass,embalming,emails,elude,elspeth,electrocute,electrified,eigth,eheh,eggshell,eeyy,echinacea,eases,earpiece,earlobe,dwarfs,dumpsters,dumbshit,dumbasses,duloc,duisberg,drummed,drinkers,dressy,drainage,dracula's,dorma,dolittle,doily,divvy,diverting,ditz,dissuade,disrespecting,displacement,displace,disorganized,dismantled,disgustingly,discriminate,discord,disapproving,dinero,dimwit,diligence,digitally,didja,diddy,dickless,diced,devouring,devlin's,detach,destructing,desperado,desolate,designation,derek's,deposed,dependency,dentist's,demonstrates,demerits,delirium,degrade,deevak,deemesa,deductions,deduce,debriefed,deadbeats,dazs,dateline,darndest,damnable,dalliance,daiquiri,d'agosta,cuvee's,cussing,curate,cryss,cripes,cretins,creature's,crapper,crackerjack,cower,coveting,couriers,countermission,cotswolds,cornholio,copa,convinces,convertibles,conversationalist,contributes,conspirators,consorting,consoled,conservation,consarn,confronts,conformity,confides,confidentially,confederacy,concise,competence,commited,commissioners,commiserate,commencing,comme,commandos,comforter,comeuppance,combative,comanches,colosseum,colling,collaboration,coli,coexist,coaxing,cliffside,clayton's,clauses,cia's,chuy,chutes,chucked,christian's,chokes,chinaman,childlike,childhoods,chickening,chicano,chenowith,chassis,charmingly,changin,championships,chameleon,ceos,catsup,carvings,carlotta's,captioning,capsize,cappucino,capiche,cannonball,cannibal,candlewell,cams,call's,calculation,cakewalk,cagey,caesar's,caddie,buxley,bumbling,bulky,bulgarian,bugle,buggered,brussel,brunettes,brumby,brotha,bros,bronck,brisket,bridegroom,breathing's,breakout,braveheart,braided,bowled,bowed,bovary,bordering,bookkeeper,bluster,bluh,blue's,blot,bloodline,blissfully,blarney,binds,billionaires,billiard,bide,bicycles,bicker,berrisford,bereft,berating,berate,bendy,benches,bellevue,belive,believers,belated,beikoku,beens,bedspread,bed's,bear's,bawdy,barrett's,barreling,baptize,banya,balthazar,balmoral,bakshi,bails,badgered,backstreet,backdrop,awkwardly,avoids,avocado,auras,attuned,attends,atheists,astaire,assuredly,art's,arrivederci,armaments,arises,argyle,argument's,argentine,appetit,appendectomy,appealed,apologetic,antihistamine,antigua,anesthesiologist,amulets,algonquin,alexander's,ales,albie,alarmist,aiight,agility,aforementioned,adstream,adolescents,admirably,adjectives,addison's,activists,acquaint,acids,abound,abominable,abolish,abode,abfc,aaaaaaah,zorg,zoltan,zoe's,zekes,zatunica,yama,wussy,wrcw,worded,wooed,woodrell,wiretap,windowsill,windjammer,windfall,whitey's,whitaker's,whisker,whims,whatiya,whadya,westerns,welded,weirdly,weenies,webster's,waunt,washout,wanto,waning,vitality,vineyards,victimless,vicki's,verdad,veranda,vegan,veer,vandaley,vancouver,vancomycin,valise,validated,vaguest,usefulness,upshot,uprising,upgrading,unzip,unwashed,untrained,unsuitable,unstuck,unprincipled,unmentionables,unjustly,unit's,unfolds,unemployable,uneducated,unduly,undercut,uncovering,unconsciousness,unconsciously,unbeknownst,unaffected,ubiquitous,tyndareus,tutors,turncoat,turlock,tulle,tuesday's,tryouts,truth's,trouper,triplette,trepkos,tremor,treeger,treatment's,traveller,traveler's,trapeze,traipse,tradeoff,trach,torin,tommorow,tollan,toity,timpani,tilted,thumbprint,throat's,this's,theater's,thankless,terrestrial,tenney's,tell'em,telepathy,telemarketing,telekinesis,teevee,teeming,tc's,tarred,tankers,tambourine,talentless,taki,takagi,swooped,switcheroo,swirly,sweatpants,surpassed,surgeon's,supermarkets,sunstroke,suitors,suggestive,sugarcoat,succession,subways,subterfuge,subservient,submitting,subletting,stunningly,student's,strongbox,striptease,stravanavitch,stradling,stoolie,stodgy,stocky,stimuli,stigmata,stifle,stealer,statewide,stark's,stardom,stalemate,staggered,squeezes,squatter,squarely,sprouted,spool,spirit's,spindly,spellman's,speedos,specify,specializing,spacey,soups,soundly,soulmates,somethin's,somebody'll,soliciting,solenoid,sobering,snowflakes,snowballs,snores,slung,slimming,slender,skyscrapers,skulk,skivvies,skillful,skewered,skewer,skaters,sizing,sistine,sidebar,sickos,shushing,shunt,shugga,shone,shol'va,shiv,shifter,sharply,sharpened,shareholder,shapeshifter,shadowing,shadoe,serviced,selwyn,selectman,sefelt,seared,seamen,scrounging,scribbling,scotty's,scooping,scintillating,schmoozing,schenectady,scene's,scattering,scampi,scallops,sat's,sapphires,sans,sanitarium,sanded,sanction,safes,sacrificial,rudely,roust,rosebush,rosasharn,rondell,roadhouse,riveted,rile,ricochet,rhinoceros,rewrote,reverence,revamp,retaliatory,rescues,reprimand,reportedly,replicators,replaceable,repeal,reopening,renown,remo's,remedied,rembrandt,relinquishing,relieving,rejoicing,reincarnated,reimbursed,refinement,referral,reevaluate,redundancy,redid,redefine,recreating,reconnected,recession,rebelling,reassign,rearview,reappeared,readily,rayne,ravings,ravage,ratso,rambunctious,rallying,radiologist,quiver,quiero,queef,quark,qualms,pyrotechnics,pyro,puritan,punky,pulsating,publisher's,psychosomatic,provisional,proverb,protested,proprietary,promiscuous,profanity,prisoner's,prioritize,preying,predisposition,precocious,precludes,preceding,prattling,prankster,povich,potting,postpartum,portray,porter's,porridge,polluting,pogo,plowing,plating,plankton,pistachio,pissin,pinecone,pickpocket,physicists,physicals,pesticides,peruse,pertains,personified,personalize,permitting,perjured,perished,pericles,perfecting,percentages,pepys,pepperdine,pembry,peering,peels,pedophile,patties,pathogen,passkey,parrots,paratroopers,paratrooper,paraphernalia,paralyzing,panned,pandering,paltry,palpable,painkiller,pagers,pachyderm,paced,overtaken,overstay,overestimated,overbite,outwit,outskirts,outgrow,outbid,origins,ordnance,ooze,ooops,oomph,oohhh,omni,oldie,olas,oddball,observers,obscurity,obliterate,oblique,objectionable,objected,oars,o'keefe,nygma,nyet,nouveau,notting,nothin's,noches,nnno,nitty,nighters,nigger's,niche,newsstands,newfoundland,newborns,neurosurgery,networking,nellie's,nein,neighboring,negligible,necron,nauseated,nastiest,nasedo's,narrowing,narrator,narcolepsy,napa,nala,nairobi,mutilate,muscled,murmur,mulva,multitude,multiplex,mulling,mules,mukada,muffled,mueller's,motorized,motif,mortgages,morgues,moonbeams,monogamy,mondays,mollusk,molester,molestation,molars,modifications,modeled,moans,misuse,misprint,mismatched,mirth,minnow,mindful,mimosas,millander,mikhail,mescaline,mercutio,menstrual,menage,mellowing,medicaid,mediator,medevac,meddlesome,mcgarry's,matey,massively,massacres,marky,many's,manifests,manifested,manicures,malevolent,malaysian,majoring,madmen,mache,macarthur's,macaroons,lydell,lycra,lunchroom,lunching,lozenges,lorenzo's,looped,look's,lolly,lofty,lobbyist,litigious,liquidate,linoleum,lingk,lincoln's,limitless,limitation,limber,lilacs,ligature,liftoff,lifeboats,lemmiwinks,leggo,learnin,lazarre,lawyered,landmarks,lament,lambchop,lactose,kringle,knocker,knelt,kirk's,kins,kiev,keynote,kenyon's,kenosha,kemosabe,kazi,kayak,kaon,kama,jussy,junky,joyce's,journey's,jordy,jo's,jimmies,jetson,jeriko,jean's,janet's,jakovasaur,jailed,jace,issacs,isotopes,isabela,irresponsibility,ironed,intravenous,intoxication,intermittent,insufficient,insinuated,inhibitors,inherits,inherently,ingest,ingenue,informs,influenza,inflexible,inflame,inevitability,inefficient,inedible,inducement,indignant,indictments,indentured,indefensible,inconsistencies,incomparable,incommunicado,in's,improvising,impounded,illogical,ignoramus,igneous,idlewild,hydrochloric,hydrate,hungover,humorless,humiliations,humanoid,huhh,hugest,hudson's,hoverdrone,hovel,honor's,hoagie,hmmph,hitters,hitchhike,hit's,hindenburg,hibernating,hermione,herds,henchman,helloooo,heirlooms,heaviest,heartsick,headshot,headdress,hatches,hastily,hartsfield's,harrison's,harrisburg,harebrained,hardships,hapless,hanen,handsomer,hallows,habitual,habeas,guten,gus's,gummy,guiltier,guidebook,gstaad,grunts,gruff,griss,grieved,grids,grey's,greenville,grata,granny's,gorignak,goosed,goofed,goat's,gnarly,glowed,glitz,glimpses,glancing,gilmores,gilligan's,gianelli,geraniums,georgie's,genitalia,gaydar,gart,garroway,gardenia,gangbusters,gamblers,gamble's,galls,fuddy,frumpy,frowning,frothy,fro'tak,friars,frere,freddy's,fragrances,founders,forgettin,footsie,follicles,foes,flowery,flophouse,floor's,floatin,flirts,flings,flatfoot,firefighter,fingerprinting,fingerprinted,fingering,finald,film's,fillet,file's,fianc,femoral,fellini,federated,federales,faze,fawkes,fatally,fascists,fascinates,farfel,familiarity,fambly,falsified,fait,fabricating,fables,extremist,exterminators,extensively,expectant,excusez,excrement,excercises,excavation,examinations,evian,evah,etins,esther's,esque,esophageal,equivalency,equate,equalizer,environmentally,entrees,enquire,enough's,engine's,endorsed,endearment,emulate,empathetic,embodies,emailed,eggroll,edna's,economist,ecology,eased,earmuffs,eared,dyslexic,duper,dupe,dungeons,duncan's,duesouth,drunker,drummers,druggie,dreadfully,dramatics,dragnet,dragline,dowry,downplay,downers,doritos,dominatrix,doers,docket,docile,diversify,distracts,disruption,disloyalty,disinterested,disciple,discharging,disagreeable,dirtier,diplomats,dinghy,diner's,dimwitted,dimoxinil,dimmy,dietary,didi,diatribe,dialects,diagrams,diagnostics,devonshire,devising,deviate,detriment,desertion,derp,derm,dept,depressants,depravity,dependence,denounced,deniability,demolished,delinquents,defiled,defends,defamation,deepcore,deductive,decrease,declares,declarations,decimated,decimate,deb's,deadbolt,dauthuille,dastardly,darla's,dans,daiquiris,daggers,dachau,d'ah,cymbals,customized,curved,curiouser,curdled,cupid's,cults,cucamonga,cruller,cruces,crow's,crosswalk,crossover,crinkle,crescendo,cremate,creeper,craftsman,cox's,counteract,counseled,couches,coronet,cornea,cornbread,corday,copernicus,conveyed,contrition,contracting,contested,contemptible,consultants,constructing,constipated,conqueror,connor's,conjoined,congenital,confounded,condescend,concubine,concoct,conch,concerto,conceded,compounded,compensating,comparisons,commoners,committment,commencement,commandeered,comely,coined,cognitive,codex,coddled,cockfight,cluttered,clunky,clownfish,cloaked,cliches,clenched,cleft,cleanin,cleaner's,civilised,circumcised,cimmeria,cilantro,chutzpah,chutney,chucking,chucker,chronicles,chiseled,chicka,chicago's,chattering,charting,characteristic,chaise,chair's,cervix,cereals,cayenne,carrey,carpal,carnations,caricature,cappuccinos,candy's,candied,cancer's,cameo,calluses,calisthenics,cadre,buzzsaw,bushy,burners,bundled,bum's,budington,buchanans,brock's,britons,brimming,breeders,breakaway,braids,bradley's,boycotting,bouncers,botticelli,botherin,boosting,bookkeeping,booga,bogyman,bogged,bluepoint's,bloodthirsty,blintzes,blanky,blak,biosphere,binturong,billable,bigboote,bewildered,betas,bernard's,bequeath,beirut,behoove,beheaded,beginners,beginner,befriend,beet,bedpost,bedded,bay's,baudelaires,barty,barreled,barboni,barbeque,bangin,baltus,bailout,bag's,backstabber,baccarat,awning,awaited,avenues,austen,augie,auditioned,auctions,astrology,assistant's,assassinations,aspiration,armenians,aristocrat,arguillo,archway,archaeologist,arcane,arabic,apricots,applicant,apologising,antennas,annyong,angered,andretti,anchorman,anchored,amritsar,amour,amidst,amid,americana,amenable,ambassadors,ambassador's,amazement,allspice,alannis,airliner,airfare,airbags,ahhhhhhhhh,ahhhhhhhh,ahhhhhhh,agitator,afternoon's,afghan,affirmation,affiliate,aegean,adrenal,actor's,acidosis,achy,achoo,accessorizing,accentuate,academically,abuses,abrasions,abilene,abductor,aaaahhh,zuzu,zoot,zeroing,zelner,zeldy,yo's,yevgeny,yeup,yeska,yellows,yeesh,yeahh,yamuri,yaks,wyatt's,wspr,writing's,wrestlers,wouldn't've,workmanship,woodsman,winnin,winked,wildness,widespread,whoring,whitewash,whiney,when're,wheezer,wheelman,wheelbarrow,whaling,westerburg,wegener's,weekdays,weeding,weaving,watermelons,watcher's,washboard,warmly,wards,waltzes,walt's,walkway,waged,wafting,voulez,voluptuous,vitone,vision's,villa's,vigilantes,videotaping,viciously,vices,veruca,vermeer,verifying,ventured,vaya,vaults,vases,vasculitis,varieties,vapor,valets,upriver,upholstered,upholding,unwavering,unused,untold,unsympathetic,unromantic,unrecognizable,unpredictability,unmask,unleashing,unintentional,unilaterally,unglued,unequivocal,underside,underrated,underfoot,unchecked,unbutton,unbind,unbiased,unagi,uhhhhh,turnovers,tugging,trouble's,triads,trespasses,treehorn,traviata,trappers,transplants,transforming,trannie,tramping,trainers,traders,tracheotomy,tourniquet,tooty,toothless,tomarrow,toasters,tine,tilting,thruster,thoughtfulness,thornwood,therapies,thanksgiving's,tha's,terri's,tengo,tenfold,telltale,telephoto,telephoned,telemarketer,teddy's,tearin,tastic,tastefully,tasking,taser,tamed,tallow,taketh,taillight,tadpoles,tachibana,syringes,sweated,swarthy,swagger,surrey,surges,surf's,supermodels,superhighway,sunup,sun'll,summaries,sumerian,sulu,sulphur,sullivan's,sulfa,suis,sugarless,sufficed,substituted,subside,submerged,subdue,styling,strolled,stringy,strengthens,street's,straightest,straightens,storyteller,storefront,stopper,stockpiling,stimulant,stiffed,steyne,sternum,stereotypical,stepladder,stepbrother,steers,steeple,steelheads,steakhouse,statue's,stathis,stankylecartmankennymr,standoffish,stalwart,stallions,stacy's,squirted,squeaker,squad's,spuds,spritz,sprig,sprawl,spousal,sportsman,sphincter,spenders,spearmint,spatter,sparrows,spangled,southey,soured,sonuvabitch,somethng,societies,snuffed,snowfall,snowboarding,sniffs,snafu,smokescreen,smilin,slurred,slurpee,slums,slobs,sleepwalker,sleds,slays,slayage,skydiving,sketched,skateboarding,skanks,sixed,siri,sired,siphoned,siphon,singer's,simpering,silencer,sigfried,siena,sidearm,siddons,sickie,siberian,shuteye,shuk,shuffleboard,shrubberies,shrouded,showmanship,shower's,shouldn't've,shortwave,shoplift,shooter's,shiatsu,sheriffs,shak,shafts,serendipity,serena's,sentries,sentance,sensuality,semesters,seething,sedition,secular,secretions,searing,scuttlebutt,sculpt,scowling,scouring,scorecard,schwarzenegger,schoolers,schmucks,scepters,scaly,scalps,scaling,scaffolding,sauces,sartorius,santen,sampler,salivating,salinger,sainthood,said's,saget,saddens,rygalski,rusting,rumson's,ruination,rueland,rudabaga,rubles,rowr,rottweiler,rotations,roofies,romantics,rollerblading,roldy,rob's,roadshow,rike,rickets,rible,rheza,revisiting,revisited,reverted,retrospective,retentive,resurface,restores,respite,resounding,resorting,resolutions,resists,repulse,repressing,repaying,reneged,relays,relayed,reinforce,regulator,registers,refunds,reflections,rediscover,redecorated,recruitment,reconstructive,reconstructed,recommitted,recollect,recoil,recited,receptor,receptacle,receivers,reassess,reanimation,realtors,razinin,ravaged,ratios,rationalization,ratified,ratatouille,rashum,rasczak,rarer,rapping,rancheros,rampler,rain's,railway,racehorse,quotient,quizzing,quips,question's,quartered,qualification,purring,pummeling,puede,publicized,psychedelic,proximo,proteins,protege,prospectus,pronouncing,pronoun,prolonging,program's,proficient,procreation,proclamations,prio,principled,prides,pricing,presbyterian,preoccupation,prego,preferential,predicts,precog,prattle,pounced,potshots,potpourri,portsmouth,porque,poppie's,poms,pomeranian,pomegranates,polynesian,polymer,polenta,plying,plume,plumber's,pluie,plough,plesac,playoff,playmates,planter,plantains,plaintiff's,pituitary,pisano's,pillowcase,piddle,pickers,phys,photocopied,philistine,pfeiffer's,peyton's,petitioned,persuading,perpetuate,perpetually,periodically,perilous,pensacola,pawned,pausing,pauper,patterned,pats,patronage,passover,partition,parter,parlez,parlay,parkinson's,parades,paperwork's,pally,pairing,ovulation,overtake,overstate,overpowering,overpowered,overconfident,overbooked,ovaltine,ouzo,outweighs,outings,outfit's,out's,ottos,orrin,originate,orifice,orangutan,optimal,optics,opportunistic,ooww,oopsy,ooooooooh,ooohhhh,onyx,onslaught,oldsmobile,ocular,ocean's,obstruct,obscenely,o'dwyer,o'brien's,nutjob,nunur,notifying,nostrand,nonny,nonfat,noblest,nimble,nikes,nicht,newsworthy,network's,nestled,nessie,necessities,nearsighted,ne'er,nazareth,navidad,nastier,nasa's,narco,nakedness,muted,mummified,multiplying,mudda,mtv's,mozzarella,moxica,motorists,motivator,motility,mothafucka,mortmain,mortgaged,mortally,moroccan,mores,moonshine,mongers,moe's,modify,mobster's,mobilization,mobbed,mitigating,mistah,misrepresented,mishke,misfortunes,misdirection,mischievous,mirrored,mineshaft,mimosa,millers,millaney,miho,midday,microwaves,mick's,metzenbaum,metres,merc,mentoring,medicine's,mccovey,maya's,mau's,masterful,masochistic,martie,marliston,market's,marijawana,marie's,marian's,manya,manuals,mantumbi,mannheim,mania,mane,mami's,malarkey,magnifique,magics,magician's,madrona,madox,madison's,machida,m'mm,m'hm,m'hidi,lyric,luxe,luther's,lusty,lullabies,loveliness,lotions,looka,lompoc,loader,litterbug,litigator,lithe,liquorice,lins,linguistics,linds,limericks,lightbulb,lewises,letch,lemec,lecter's,leavenworth,leasing,leases,layover,layered,lavatory,laurels,launchers,laude,latvian,lateness,lasky's,laparotomy,landlord's,laboring,la's,kumquat,kuato,kroff,krispy,kree,krauts,kona,knuckleheads,knighthood,kiva,kitschy,kippers,kip's,kimbrow,kike,keypad,keepsake,kebab,keane's,kazakhstan,karloff,justices,junket,juicer,judy's,judgemental,jsut,jointed,jogs,jezzie,jetting,jekyll,jehovah's,jeff's,jeeze,jeeter,jeesus,jeebs,janeane,jalapeno,jails,jailbait,jagged,jackin,jackhammer,jacket's,ixnay,ivanovich,issue's,isotope,island's,irritates,irritability,irrevocable,irrefutable,irma's,irked,invoking,intricacies,interferon,intents,inte,insubordinate,instructive,instinctive,inspector's,inserting,inscribed,inquisitive,inlay,injuns,inhibited,infringement,information's,infer,inebriated,indignity,indecisive,incisors,incacha,inauguration,inalienable,impresses,impregnate,impregnable,implosion,immersed,ikea,idolizes,ideological,idealism,icepick,hypothyroidism,hypoglycemic,hyde's,hutz,huseni,humvee,hummingbird,hugely,huddling,housekeeper's,honing,hobnobbing,hobnob,histrionics,histamine,hirohito,hippocratic,hindquarters,hinder,himalayan,hikita,hikes,hightailed,hieroglyphics,heyy,heuh,heretofore,herbalist,her's,henryk,henceforth,hehey,hedriks,heartstrings,headmistress,headlight,harvested,hardheaded,happend,handlers,handlebars,hagitha,habla,gyroscope,guys'd,guy'd,guttersnipe,grump,growed,grovelling,grooves,groan,greenbacks,greats,gravedigger,grating,grasshoppers,grappling,graph,granger's,grandiose,grandest,gram's,grains,grafted,gradual,grabthar's,goop,gooood,goood,gooks,godsakes,goaded,gloria's,glamorama,giveth,gingham,ghostbusters,germane,georgy,geisha,gazzo,gazelles,gargle,garbled,galgenstein,galapagos,gaffe,g'day,fyarl,furnish,furies,fulfills,frowns,frowned,frommer's,frighteningly,fresco,freebies,freakshow,freakishly,fraudulent,fragrant,forewarned,foreclose,forearms,fordson,ford's,fonics,follies,foghorn,fly's,flushes,fluffy's,flitting,flintstone,flemmer,flatline,flamboyant,flabby,fishbowl,firsts,finger's,financier,figs,fidgeting,fictitious,fevers,feur,ferns,feminism,fema,feigning,faxing,fatigued,fathoms,fatherless,fares,fancier,fanatical,fairs,factored,eyelid,eyeglasses,eye's,expresso,exponentially,expletive,expectin,excruciatingly,evidentiary,ever'thing,evelyn's,eurotrash,euphoria,eugene's,eubie,ethiopian,ethiopia,estrangement,espanol,erupted,ernie's,erlich,eres,epitome,epitaph,environments,environmentalists,entrap,enthusiastically,entertainers,entangled,enclose,encased,empowering,empires,emphysema,embers,embargo,emasculating,elizabethan,elephant's,eighths,egyptians,effigy,editions,echoing,eardrum,dyslexia,duplicitous,duplicated,dumpty,dumbledore,dufus,dudley's,duddy,duck's,duchamp,drunkenness,drumlin,drowns,droid,drinky,drifts,drawbridge,dramamine,downey's,douggie,douchebag,dostoyevsky,dorian's,doodling,don'tcha,domo,domineering,doings,dogcatcher,documenting,doctoring,doctoral,dockers,divides,ditzy,dissimilar,dissecting,disparage,disliking,disintegrating,dishwalla,dishonored,dishing,disengaged,discretionary,discard,disavowed,directives,dippy,diorama,dimmed,diminishing,dilate,dijon,digitalis,diggory,dicing,diagnosing,devout,devola,developmental,deter,destiny's,desolation,descendant,derived,derevko's,deployment,dennings,denials,deliverance,deliciously,delicacies,degenerates,degas,deflector,defile,deference,defenders,deduced,decrepit,decreed,decoding,deciphered,dazed,dawdle,dauphine,daresay,dangles,dampen,damndest,customer's,curricular,cucumbers,cucaracha,cryogenically,cruella,crowd's,croaks,croaked,criticise,crit,crisper,creepiest,creep's,credit's,creams,crawford's,crackle,crackin,covertly,cover's,county's,counterintelligence,corrosive,corpsman,cordially,cops'll,convulsions,convoluted,convincingly,conversing,contradictions,conga,confucius,confrontational,confab,condolence,conditional,condition's,condiments,composing,complicit,compiled,compile,compiegne,commuter,commodus,commissions,comings,cometh,combining,colossus,collusion,collared,cockeyed,coastline,clobber,clemonds,clashes,clarithromycin,clarified,cinq,cienega,chronological,christmasy,christmassy,chloroform,chippie,childless,chested,chemistry's,cheerios,cheeco,checklist,chaz,chauvinist,char,chang's,chandlers,chamois,chambermaid,chakras,chak,censored,cemented,cellophane,celestial,celebrations,caveat,catholicism,cataloguing,cartmanland,carples,carny,carded,caramels,captors,caption,cappy,caped,canvassing,cannibalism,canada's,camille's,callback,calibrated,calamine,cal's,cabo,bypassed,buzzy,buttermilk,butterfingers,bushed,burlesque,bunsen,bung,bulimia,bukatari,buildin,budged,bronck's,brom,brobich,bringer,brine,brendell,brawling,bratty,brasi,braking,braised,brackett's,braced,boyish,boundless,botch,borough,boosh,bookies,bonbons,bois,bodes,bobunk,bluntly,blossoming,bloopers,bloomers,bloodstains,bloodhounds,blitzen,blinker,blech,blasts,blanca's,bitterly,biter,biometric,bioethics,bilk,bijan,bigoted,bicep,betrothed,bergdorf's,bereaved,bequeathed,belo,bellowing,belching,beholden,befriended,beached,bawk,battled,batmobile,batman's,baseline,baseball's,barcodes,barch,barbie's,barbecuing,bandanna,baldy,bailey's,baghdad,backwater,backtrack,backdraft,ayuh,awgh,augustino,auctioned,attaching,attaches,atrophy,atrocity,atley,athletics,atchoo,asymmetrical,asthmatic,assoc,assists,ascending,ascend,articulated,arrr,armstrong's,armchair,arisen,archeology,archeological,arachnids,aptly,applesauce,appetizing,antisocial,antagonizing,anorexia,anini,angie's,andersons,anarchist,anagram,amputation,amherst,alleluia,algorithms,albemarle,ajar,airlock,airbag,aims,aimless,ailments,agua,agonized,agitate,aggravating,affirming,aerosol,aerosmith,aeroplane,acing,accumulated,accomplishing,accolades,accidently,academia,abuser,abstain,abso,abnormally,aberration,abandons,aaww,aaaaahh,zlotys,zesty,zerzura,zapruder,zany,zantopia,yugoslavia,youo,yoru,yipe,yeow,yello,yelburton,yeess,yaah,y'knowwhati'msayin,wwhat,wussies,wrenched,would'a,worryin,wormser,wooooo,wookiee,wolfe's,wolchek,woes,wishin,wiseguys,winston's,winky,wine's,windbreaker,wiggy,wieners,wiedersehen,whoopin,whittled,whey,whet,wherefore,wharvey,welts,welt,wellstone,weee,wednesday's,wedges,wavered,watchit,wastebasket,ward's,wank,wango,wallet's,wall's,waken,waiver,waitressed,wacquiem,wabbit,vrykolaka,voula,vote's,volt,volga,volcanoes,vocals,vitally,visualizing,viscous,virgo,virg,violet's,viciousness,vewy,vespers,vertes,verily,vegetarians,vater,vaseline,varied,vaporize,vannacutt,vallens,valenti's,vacated,uterine,usta,ussher,urns,urinating,urchin,upping,upheld,unwitting,untreated,untangle,untamed,unsanitary,unraveled,unopened,unisex,uninvolved,uninteresting,unintelligible,unimaginative,undisclosed,undeserving,undermines,undergarments,unconcerned,unbroken,ukrainian,tyrants,typist,tykes,tybalt,twosome,twits,tutti,turndown,tularemia,tuberculoma,tsimshian,truffaut,truer,truant,trove,triumphed,tripe,trigonometry,trifled,trifecta,tricycle,trickle,tribulations,trevor's,tremont,tremoille,treaties,trawler,translators,transcends,trafficker,touchin,tonnage,tomfoolery,tolls,tokens,tinkered,tinfoil,tightrope,ticket's,thth,thousan,thoracotomy,theses,thesaurus,theologian,themed,thawing,thatta,thar,textiles,testimonies,tessio,terminating,temps,taxidermist,tator,tarkin,tangent,tactile,tachycardia,t'akaya,synthesize,symbolically,swelco,sweetbreads,swedes,swatting,swastika,swamps,suze,supernova,supercollider,sunbathing,summarily,suffocation,sueleen,succinct,subtitle,subsided,submissive,subjecting,subbing,subatomic,stupendous,stunted,stubble,stubbed,striving,streetwalker,strategizing,straining,straightaway,storyline,stoli,stock's,stipulated,stimulus,stiffer,stickup,stens,steamroller,steadwell,steadfast,stave,statutes,stateroom,stans,stacey's,sshhhh,squishing,squinting,squealed,sprouting,sprimp,spreadsheets,sprawled,spotlights,spooning,spoiler,spirals,spinner's,speedboat,spectacles,speakerphone,spar,spaniards,spacing,sovereignty,southglen,souse,soundproof,soothsayer,soon's,sommes,somethings,solidify,soars,snorted,snorkeling,snitches,sniping,sniper's,snifter,sniffin,snickering,sneer,snarl,smila,slinking,sleuth,slater's,slated,slanted,slanderous,slammin,skyscraper,skimp,skilosh,skeletal,skag,siteid,sirloin,singe,simulate,signaled,sighing,sidekicks,sicken,shrubs,shrub,showstopper,shot's,shostakovich,shoreline,shoppin,shoplifter,shop's,shoe's,shoal,shitter,shirt's,shimokawa,sherborne,sheds,shawna's,shavadai,sharpshooters,sharking,shane's,shakespearean,shagged,shaddup,sexism,sexes,sesterces,serotonin,sequences,sentient,sensuous,seminal,selections,seismic,seashell,seaplane,sealing,seahaven,seagrave,scuttled,scullery,scow,scots,scorcher,scorch,schotzie,schnoz,schmooze,schlep,schizo,schindler's,scents,scalping,scalped,scallop,scalding,sayeth,saybrooke,sawed,savoring,sardine,sandy's,sandstorm,sandalwood,samoa,samo,salutations,salad's,saki,sailor's,sagman,s'okay,rudy's,rsvp'd,royale,rousted,rootin,roofs,romper,romanovs,rollercoaster,rolfie,rockers,rock's,robinsons,ritzy,ritualistic,ringwald,rhymed,rheingold,rewrites,revolved,revolutionaries,revoking,reviewer,reverts,retrofit,retort,retinas,resurfaced,respirations,respectively,resolute,resin,reprobate,replaying,repayment,repaint,renquist,renege,renders,rename,remarked,relapsing,rekindled,rejuvenating,rejuvenated,reinstating,reinstatement,reigns,referendums,recriminations,recitals,rechecked,reception's,recaptured,rebounds,reassemble,rears,reamed,realty,reader's,reacquaint,rayanne,ravish,rava,rathole,raspail,rarest,rapists,rants,ramone,ragnar,radiating,radial,racketeer,quotation,quittin,quitters,quintessential,quincy's,queremos,quellek,quelle,quasimodo,quarterbacks,quarter's,pyromaniac,puttanesca,puritanical,purged,purer,puree,punishments,pungent,pummel,puedo,pudge,puce,psychotherapist,psycho's,prosecutorial,prosciutto,propositioning,propellers,pronouns,progresses,procured,procrastination,processes,probationary,primping,primates,priest's,preventative,prevails,presided,preserves,preservatives,prefix,predecessors,preachy,prancer,praetorians,practicality,powders,potus,pot's,postop,positives,poser,portolano,portokalos,poolside,poltergeists,pocketed,poach,plunder,plummeted,plucking,plop,plimpton,plethora,playthings,player's,playboys,plastique,plainclothes,pious,pinpointed,pinkus,pinks,pilgrimage,pigskin,piffle,pictionary,piccata,photocopy,phobias,persia,permissible,perils,perignon,perfumes,peon,penned,penalized,peg's,pecks,pecked,paving,patriarch,patents,patently,passable,participants,parasitic,parasailing,paramus,paramilitary,parabolic,parable,papier,paperback,paintbrush,pacer,paaiint,oxen,owen's,overtures,overthink,overstayed,overrule,overlapping,overestimate,overcooked,outlandish,outgrew,outdoorsy,outdo,outbound,ostensibly,originating,orchestrate,orally,oppress,opposable,opponent's,operation's,oooohh,oomupwah,omitted,okeydokey,okaaay,ohashi,offerings,of'em,od'd,occurrences,occupant,observable,obscenities,obligatory,oakie,o'malley's,o'gar,nyah's,nurection,nun's,nougat,nostradamus,norther,norcom,nooch,nonviolent,nonsensical,nominating,nomadic,noel's,nkay,nipped,nimbala,nigeria,nigel's,nicklaus,newscast,nervously,nell's,nehru,neckline,nebbleman,navigator,nasdaq,narwhal,nametag,n'n't,mycenae,myanmar,muzak,muumuu,murderer's,mumbled,mulvehill,multiplication,multiples,muggings,muffet,mozart's,mouthy,motorbike,motivations,motivates,motaba,mortars,mordred,mops,moocher,moniker,mongi,mondo,monday's,moley,molds,moisturize,mohair,mocky,mmkay,mistuh,missis,mission's,misdeeds,minuscule,minty,mined,mincemeat,milton's,milt,millennia,mikes,miggs,miffed,mieke's,midwestern,methadone,metaphysics,messieur,merging,mergers,menopausal,menagerie,meee,mckenna's,mcgillicuddy,mayflowers,maxim's,matrimonial,matisse,matick,masculinity,mascots,masai,marzipan,marika,maplewood,manzelle,manufactures,manticore's,mannequins,manhole,manhandle,manatee,mallory's,malfunctions,mainline,magua's,madwoman,madeline's,machiavelli,lynley,lynching,lynched,lurconis,lujack,lubricant,looove,loons,loom,loofah,longevity,lonelyhearts,lollipops,loca,llama,liquidation,lineswoman,lindsey's,lindbergh,lilith's,lila's,lifers,lichen,liberty's,lias,lexter,levee,letter's,lessen,lepner,leonard's,lemony,leggy,leafy,leaflets,leadeth,lazerus,lazare,lawford,languishing,langford's,landslide,landlords,lagoda,ladman,lad's,kuwait,kundera,krist's,krinkle,krendler,kreigel,kowolski,kosovo,knockdown,knifed,kneed,kneecap,kids'll,kevlar,kennie,keeled,kazootie,kaufman's,katzenmoyer,kasdan,karl's,karak,kapowski,kakistos,jumpers,julyan,juanito,jockstrap,jobless,jiggly,jesuit,jaunt,jarring,jabbering,israelites,irrigate,irrevocably,irrationally,ironies,ions,invitro,inventions,intrigues,intimated,interview's,intervening,interchangeable,intently,intentioned,intelligently,insulated,institutional,instill,instigator,instigated,instep,inopportune,innuendoes,inheriting,inflate,infiltration,infects,infamy,inducing,indiscretions,indiscreet,indio,indignities,indict,indecision,incurred,incubation,inconspicuous,inappropriately,impunity,impudent,improves,impotence,implicates,implausible,imperfection,impatience,immutable,immobilize,illustration,illumination,idiot's,idealized,idealist,icelandic,iambic,hysterically,hyperspace,hygienist,hydraulics,hydrated,huzzah,husks,hurricane's,hunt's,hunched,huffed,hubris,hubbub,hovercraft,houngan,hotel's,hosed,horoscopes,hoppy,hopelessness,hoodwinked,honourable,honorably,honeysuckle,homeowners,homegirl,holiest,hoisted,hoho,ho's,hippity,hildie,hikers,hieroglyphs,hexton,herein,helicopter's,heckle,heats,heartbeat's,heaping,healthilizer,headmaster's,headfirst,hawk's,haviland's,hatsue,harlot,hardwired,hanno's,hams,hamilton's,halothane,hairstyles,hails,hailed,haagen,haaaaa,gyno,gutting,gurl,gumshoe,gummi,gull,guerilla,gttk,grover's,grouping,groundless,groaning,gristle,grills,graynamore,grassy,graham's,grabbin,governmental,goodes,goggle,godlike,glittering,glint,gliding,gleaming,glassy,girth,gimbal,gilmore's,gibson's,giblets,gert,geometric,geographical,genealogy,gellers,geller's,geezers,geeze,garshaw,gargantuan,garfunkel,gardner's,garcia's,garb,gangway,gandarium,gamut,galoshes,gallivanting,galleries,gainfully,gack,gachnar,fusionlips,fusilli,furiously,fulfil,fugu,frugal,fron,friendship's,fricking,frederika,freckling,frauds,fraternal,fountainhead,forthwith,forgo,forgettable,foresight,foresaw,footnotes,fondling,fondled,fondle,folksy,fluttering,flutie,fluffing,floundering,florin,florentine,flirtatious,flexing,flatterer,flaring,fizz,fixating,five's,fishnet,firs,firestorm,finchy,figurehead,fifths,fiendish,fertilize,ferment,fending,fellahs,feeny's,feelers,feeders,fatality,fascinate,fantabulous,falsify,fallopian,faithless,fairy's,fairer,fair's,fainter,failings,facto,facets,facetious,eyepatch,exxon,extraterrestrials,extradite,extracurriculars,extinguish,expunged,exports,expenditure,expelling,exorbitant,exigent,exhilarated,exertion,exerting,exemption,excursions,excludes,excessively,excercise,exceeds,exceeding,everbody,evaporated,euthanasia,euros,europeans,escargot,escapee,erases,epizootics,epithelials,ephrum,enthusiast,entanglements,enslaved,enslave,engrossed,endeavour,enables,enabled,empowerment,employer's,emphatic,emeralds,embroiled,embraces,ember,embellished,emancipated,ello,elisa's,elevates,ejaculate,ego's,effeminate,economically,eccentricities,easygoing,earshot,durp,dunks,dunes,dullness,dulli,dulled,drumstick,dropper,driftwood,dregs,dreck,dreamboat,draggin,downsizing,dost,doofer,donowitz,dominoes,dominance,doe's,diversions,distinctions,distillery,distended,dissolving,dissipate,disraeli,disqualify,disowned,dishwashing,discusses,discontent,disclosed,disciplining,discerning,disappoints,dinged,diluted,digested,dicking,diablos,deux,detonating,destinations,despising,designer's,deserts,derelict,depressor,depose,deport,dents,demonstrations,deliberations,defused,deflection,deflecting,decryption,decoys,decoupage,decompress,decibel,decadence,dealer's,deafening,deadlock,dawning,dater,darkened,darcy's,dappy,dancing's,damon's,dallying,dagon,d'etat,czechoslovakians,cuticles,cuteness,curacao,cupboards,cumulative,culottes,culmination,culminating,csi's,cruisin,crosshairs,cronyn,croc,criminalistics,crimean,creatively,creaming,crapping,cranny,cowed,countermeasures,corsica,corinne's,corey's,cooker,convened,contradicting,continuity,constitutionally,constipation,consort,consolidate,consisted,connection's,confining,confidences,confessor,confederates,condensation,concluding,conceiving,conceivably,concealment,compulsively,complainin,complacent,compiling,compels,communing,commonplace,commode,commission's,commissary,comming,commensurate,columnists,colonoscopy,colonists,collagen,collaborate,colchicine,coddling,clump,clubbed,clowning,closet's,clones,clinton's,clinic's,cliffhanger,classification,clang,citrus,cissy,circuitry,chronology,christophe,choosers,choker,chloride,chippewa,chip's,chiffon,chesty,chesapeake,chernobyl,chants,channeled,champagne's,chalet,chaka,cervical,cellphone,cellmates,caverns,catwalk,cathartic,catcher's,cassandra's,caseload,carpenter's,carolyn's,carnivorous,carjack,carbohydrates,capt,capitalists,canvass,cantonese,canisters,candlestick,candlelit,canaries,camry,camel's,calzones,calitri,caldy,cabin's,byline,butterball,bustier,burmese,burlap,burgeoning,bureaucrat,buffoons,buenas,bryan's,brookline,bronzed,broiled,broda,briss,brioche,briar,breathable,brea,brays,brassieres,braille,brahms,braddock's,boysenberry,bowman's,bowline,boutiques,botticelli's,boooo,boonies,booklets,bookish,boogeyman,boogey,bomb's,boldly,bogs,bogas,boardinghouse,bluuch,blundering,bluffs,bluer,blowed,blotto,blotchy,blossomed,blooms,bloodwork,bloodied,blithering,blinks,blathering,blasphemous,blacking,bison,birdson,bings,bilateral,bfmid,bfast,berserker,berkshires,bequest,benjamins,benevolence,benched,benatar,belthazor's,bellybutton,belabor,bela's,behooves,beddy,beaujolais,beattle,baxworth,batted,baseless,baring,barfing,barbi,bannish,bankrolled,banek,ballsy,ballpoint,balkans,balconies,bakers,bahama,baffling,badder,badda,bada,bactine,backgammon,baako,aztreonam,aztecs,awed,avon,autobiographical,autistic,authoritah,auspicious,august's,auditing,audible,auctioning,attitude's,atrocities,athlete's,astronomer,assessed,ascot,aristocratic,arid,argues,arachtoids,arachnid,aquaman,apropos,aprons,apprised,apprehensive,apex,anythng,antivenin,antichrist,antennae,anorexic,anoint,annum,annihilated,animal's,anguished,angioplasty,angio,amply,ampicillin,amphetamines,amino,american's,ambiguity,ambient,amarillo,alyssa's,alternator,alcove,albacore,alarm's,alabaster,airlifted,ahta,agrabah,affidavits,advocacy,advises,adversely,admonished,admonish,adler's,addled,addendum,acknowledgement,accuser,accompli,acclaim,acceleration,abut,abundant,absurdity,absolved,abrusso,abreast,abrasive,aboot,abductions,abducting,abbots,aback,ababwa,aand,aaahhhh,zorin,zinthar,zinfandel,zimbabwe,zillions,zephyrs,zatarcs,zacks,youuu,youths,yokels,yech,yardstick,yammer,y'understand,wynette,wrung,wrought,wreaths,wowed,wouldn'ta,worshiped,worming,wormed,workday,wops,woolly,wooh,woodsy,woodshed,woodchuck,wojadubakowski,withering,witching,wiseass,wiretaps,winner's,wining,willoby,wiccaning,whupped,whoopi,whoomp,wholesaler,whiteness,whiner,whatchya,wharves,whah,wetlands,westward,wenus,weirdoes,weds,webs,weaver's,wearer,weaning,watusi,wastes,warlock's,warfield's,waponi,waiting's,waistband,waht,wackos,vouching,votre,voight's,voiced,vivica,viveca,vivant,vivacious,visor,visitin,visage,virgil's,violins,vinny,vinci's,villas,vigor,video's,vicrum,vibrator,vetted,versailles,vernon's,venues,ventriloquism,venison,venerable,varnsen,variant,variance,vaporized,vapid,vanstock,vandals,vader's,vaccination,uuuuh,utilize,ushering,usda,usable,urur,urologist,urination,urinary,upstart,uprooted,unsubtitled,unspoiled,unseat,unseasonably,unseal,unsatisfying,unnerve,unlikable,unleaded,university's,universe's,uninsured,uninspired,uniformity,unicycle,unhooked,ungh,unfunny,unfreezing,unflattering,unfairness,unexpressed,unending,unencumbered,unearth,undiscovered,undisciplined,undertaken,understan,undershirt,underlings,underline,undercurrent,uncontrolled,uncivilized,uncharacteristic,umpteenth,uglies,u're,tut's,turner's,turbine,tunnel's,tuney,trustee,trumps,truckasaurus,trubshaw,trouser,trippy,tringle,trifling,trickster,triangular,trespassers,trespasser,traverse,traumas,trattoria,trashes,transgressions,tranquil,trampling,trainees,tracy's,tp'ed,toxoplasmosis,tounge,tortillas,torrent,torpedoed,topsy,topple,topnotch,top's,tonsil,tippin's,tions,timmuh,timithious,tilney,tighty,tightness,tightens,tidbits,ticketed,thyme,thrones,threepio,thoughtfully,thornhart's,thorkel,thommo,thing'll,theological,thel,theh,thefts,that've,thanksgivings,tetherball,testikov,terraforming,terminus,tepid,tendonitis,tenboom,telex,teleport,telepathic,teenybopper,taxicab,taxed,taut,tattered,tattaglias,tapered,tantric,tanneke,takedown,tailspin,tacs,tacit,tablet,tablecloth,systemic,syria,syphon,synthesis,symbiotic,swooping,swizzle,swiping,swindled,swilling,swerving,sweatshops,swayzak's,swaddling,swackhammer,svetkoff,suzie's,surpass,supossed,superdad,super's,sumptuous,sula,suit's,sugary,sugar's,sugai,suey,subvert,suburb,substantiate,subsidy,submersible,sublimating,subjugation,styx,stymied,stuntman,studded,strychnine,strikingly,strenuous,streetlights,strassmans,stranglehold,strangeness,straddling,straddle,stowaways,stotch,stockbrokers,stifling,stepford,stepdad's,steerage,steena,staunch,statuary,starlets,stanza,stanley's,stagnant,staggeringly,ssshhh,squaw,spurt,spungeon,sprightly,sprays,sportswear,spoonful,splittin,splitsville,spirituality,spiny,spider's,speedily,speculative,specialise,spatial,spastic,spas,sparrin,soybean,souvlaki,southie,southampton,sourpuss,soupy,soup's,soundstage,sophie's,soothes,somebody'd,solicited,softest,sociopathic,socialized,socialism,snyders,snowmobiles,snowballed,snatches,smugness,smoothest,smashes,slurp,slur,sloshed,sleight,skyrocket,skied,skewed,sizeable,sixpence,sipowicz,singling,simulations,simulates,similarly,silvery,silverstone,siesta,siempre,sidewinder,shyness,shuvanis,showoff,shortsighted,shopkeeper,shoehorn,shithouse,shirtless,shipshape,shingles,shifu,shes,sherman's,shelve,shelbyville,sheepskin,shat,sharpens,shaquille,shaq,shanshu,shania's,set's,servings,serpico,sequined,sensibilities,seizes,seesaw,seep,seconded,sebastian's,seashells,scrapped,scrambler,scorpions,scopes,schnauzer,schmo,schizoid,scampered,scag,savagely,saudis,satire,santas,sanskrit,sandovals,sanding,sandal,salient,saleswoman,sagging,s'cuse,rutting,ruthlessly,runoff,runneth,rulers,ruffians,rubes,roughriders,rotates,rotated,roswell's,rosalita,rookies,ron's,rollerblades,rohypnol,rogues,robinson's,roasts,roadies,river's,ritten,rippling,ripples,ring's,rigor,rigoletto,richardo,ribbed,revolutions,revlon's,reverend's,retreating,retractable,rethought,retaliated,retailers,reshoot,reserving,reseda,researchers,rescuer,reread,requisitions,repute,reprogram,representations,report's,replenish,repetitive,repetitious,repentance,reorganizing,renton,renee's,remodeled,religiously,relics,reinventing,reinvented,reheat,rehabilitate,registrar,regeneration,refueling,refrigerators,refining,reenter,redress,recruiter,recliner,reciprocal,reappears,razors,rawdy,rashes,rarity,ranging,rajeski,raison,raisers,rainier,ragtime,rages,radar's,quinine,questscape,queller,quartermaine's,pyre,pygmalion,pushers,pusan,purview,purification,pumpin,puller,pubescent,psychiatrist's,prudes,provolone,protestants,prospero,propriety,propped,prom's,procrastinate,processors,processional,princely,preyed,preventive,pretrial,preside,premiums,preface,preachers,pounder,ports,portrays,portrayal,portent,populations,poorest,pooling,poofy,pontoon,pompeii,polymerization,polloi,policia,poacher,pluses,pleasuring,pleads,playgrounds,platitudes,platforms,plateaued,plate's,plantations,plaguing,pittance,pitcher's,pinky's,pinheads,pincushion,pimply,pimped,piggyback,pierce's,piecing,physiological,physician's,phosphate,phillipe,philipse,philby,phased,pharaohs,petyr,petitioner,peshtigo,pesaram,perspectives,persnickety,perpetrate,percolating,pepto,pensions,penne,penell,pemmican,peeks,pedaling,peacemaker,pawnshop,patting,pathologically,patchouli,pasts,pasties,passin,parlors,panda's,panache,paltrow,palamon,padlock,paddy's,paddling,oversleep,overheating,overdosed,overcharge,overcame,overblown,outset,outrageously,outfitted,orsini's,ornery,origami,orgasmic,orga,order's,opportune,ooow,oooooooooh,oohhhh,olympian,olfactory,okum,ohhhhhh,ogres,odysseus,odorless,occupations,occupancy,obscenity,obliterated,nyong,nymphomaniac,nutsack,numa,ntozake,novocain,nough,noth,nosh,norwegians,northstar,nonnie,nonissue,nodules,nightmarish,nightline,nighthawk,niggas,nicu,nicolae,nicknamed,niceties,newsman,neverland,negatively,needra,nedry,necking,navour,nauseam,nauls,narim,nanda,namath,nagged,nads,naboo,n'sync,mythological,mysticism,myslexia,mutator,mustafi,mussels,muskie,musketeer,murtaugh,murderess,murder's,murals,munching,mumsy,muley,mouseville,mosque,mosh,mortifying,morgendorffers,moola,montel,mongoloid,molten,molestered,moldings,mocarbies,mo'ss,mixers,misrell,misnomer,misheard,mishandled,miscreant,misconceptions,miniscule,minimalist,millie's,millgate,migrate,michelangelo's,mettle,metricconverter,methodology,meter's,meteors,mesozoic,menorah,mengele,mendy's,membranes,melding,meanness,mcneil's,mcgruff,mcarnold,matzoh,matted,mathematically,materialized,mated,masterpieces,mastectomy,massager,masons,marveling,marta's,marquee,marooned,marone's,marmaduke,marick,marcie's,manhandled,mangoes,manatees,managerial,man'll,maltin,maliciously,malfeasance,malahide,maketh,makeshift,makeovers,maiming,magazine's,machismo,maarten,lutheran,lumpectomy,lumbering,luigi's,luge,lubrication,lording,lorca,lookouts,loogie,loners,london's,loin,lodgings,locomotive,lobes,loathed,lissen,linus,lighthearted,ligament,lifetime's,lifer,lier,lido,lickin,lewen,levitation,lestercorp,lessee,lentils,lena's,lemur,lein,legislate,legalizing,lederhosen,lawmen,laundry's,lasskopf,lardner,landscapes,landfall,lambeau,lamagra,lagging,ladonn,lactic,lacquer,laborers,labatier,kwan's,krit,krabappel,kpxy,kooks,knobby,knickknacks,klutzy,kleynach,klendathu,kinross,kinko's,kinkaid,kind'a,kimberly's,kilometer,khruschev's,khaki,keyboards,kewl,ketch,kesher,ken's,karikos,karenina,kanamits,junshi,juno's,jumbled,jujitsu,judith's,jt's,joust,journeyed,jotted,jonathan's,jizz,jingling,jigalong,jerseys,jerries,jellybean,jellies,jeeps,jeannie's,javna,jamestown,james's,jamboree,jail's,islanders,irresistable,irene's,ious,investigation's,investigates,invaders,inundated,introductory,interviewer,interrupts,interpreting,interplanetary,internist,intercranial,inspections,inspecting,inseminated,inquisitor,inland,infused,infuriate,influx,inflating,infidelities,inference,inexpensive,industrialist,incessantly,inception,incensed,incase,incapacitate,inca,inasmuch,inaccuracies,imus,improvised,imploding,impeding,impediments,immaturity,ills,illegible,idols,iditarod,identifiable,id'n,icicles,ibuprofen,i'i'm,hymie,hydrolase,hybrids,hunsecker's,hunker,humps,humons,humidor,humdinger,humbling,humankind,huggin,huffing,households,housecleaning,hothouse,hotcakes,hosty,hootenanny,hootchie,hoosegow,honouring,honks,honeymooners,homophobic,homily,homeopathic,hoffman's,hnnn,hitchhikers,hissed,hispanics,hillnigger,hexavalent,hewwo,heston's,hershe,herodotus,hermey,hergott,heresy,henny,hennigans,henhouse,hemolytic,hells,helipad,heifer,hebrews,hebbing,heaved,heartland,heah,headlock,hatchback,harvard's,harrowing,harnessed,harding's,happy's,hannibal's,hangovers,handi,handbasket,handbags,halloween's,hall's,halfrek,halfback,hagrid,hacene,gyges,guys're,gut's,gundersons,gumption,guardia,gruntmaster,grubs,group's,grouch,grossie,grosser,groped,grins,grime,grigio,griff's,greaseball,gravesite,gratuity,graphite,granma,grandfathers,grandbaby,gradski,gracing,got's,gossips,goonie,gooble,goobers,goners,golitsyn,gofer,godsake,goddaughter,gnats,gluing,glub,global's,glares,gizmos,givers,ginza,gimmie,gimmee,georgia's,gennero,gazpacho,gazed,gato,gated,gassy,gargling,gandhiji,galvanized,gallery's,gallbladder,gabriel's,gaaah,furtive,furthering,fungal,fumigation,fudd,fucka,fronkonsteen,fromby's,frills,fresher,freezin,freewald,freeloader,franklin's,framework,frailty,fortified,forger,forestry,foreclosure,forbade,foray,football's,foolhardy,fondest,fomin,followin,follower,follicle,flue,flowering,flotation,flopping,floodgates,flogged,flog,flicked,flenders,fleabag,flanks,fixings,fixable,fistful,firewater,firestarter,firelight,fingerbang,finalizing,fillin,filipov,fido,fiderer,feminists,felling,feldberg,feign,favorably,fave,faunia,faun,fatale,fasting,farkus,fared,fallible,faithfulness,factoring,facilitated,fable,eyeful,extramarital,extracts,extinguished,exterminated,exposes,exporter,exponential,exhumed,exhume,exasperated,eviscerate,evidenced,evanston,estoy,estimating,esmerelda,esme,escapades,erosion,erie,equitable,epsom,epoxy,enticed,enthused,entendre,ensued,enhances,engulfed,engrossing,engraving,endorphins,enamel,emptive,empirical,emmys,emission,eminently,embody,embezzler,embarressed,embarrassingly,embalmed,emancipation,eludes,eling,elevation,electorate,elated,eirie,egotitis,effecting,eerily,eeew,eecom,editorials,edict,eczema,ecumenical,ecklie's,earthy,earlobes,eally,dyeing,dwells,dvds,duvet,duncans,dulcet,duckling,droves,droppin,drools,drey'auc,dreamers,dowser's,downriver,downgraded,doping,doodie,dominicans,dominating,domesticity,dollop,doesnt,doer,dobler,divulged,divisional,diversionary,distancing,dissolves,dissipated,displaying,dispensers,dispensation,disorienting,disneyworld,dismissive,dismantling,disingenuous,disheveled,disfiguring,discourse,discontinued,disallowed,dinning,dimming,diminutive,diligently,dilettante,dilation,diggity,diggers,dickensian,diaphragms,diagnoses,dewy,developer,devastatingly,determining,destabilize,desecrate,derives,deposing,denzel,denouncing,denominations,denominational,deniece,demony,delving,delt,delicates,deigned,degrassi's,degeneration,defraud,deflower,defibrillator,defiantly,deferred,defenceless,defacing,dedicating,deconstruction,decompose,deciphering,decibels,deceptively,deceptions,decapitation,debutantes,debonair,deadlier,dawdling,davic,databases,darwinism,darnit,darks,danke,danieljackson,dangled,daimler,cytoxan,cylinders,cutout,cutlery,cuss,cushing's,curveball,curiously,curfews,cummerbund,cuckoo's,crunches,crucifixion,crouched,croix,criterion,crisps,cripples,crilly,cribs,crewman,cretaceous,creepin,creeds,credenza,creak,crawly,crawlin,crawlers,crated,crasher,crackheads,coworker,counterpart,councillor,coun,couldn't've,cots,costanza's,cosgrove's,corwins,corset,correspondents,coriander,copiously,convenes,contraceptives,continuously,contingencies,contaminating,consul,constantinople,conniption,connie's,conk,conjugate,condiment,concurrently,concocting,conclave,concert's,con's,comprehending,compliant,complacency,compilation,competitiveness,commendatore,comedies,comedians,comebacks,combines,com'on,colonized,colonization,collided,collectively,collarbone,collaborating,collaborated,colitis,coldly,coiffure,coffers,coeds,codependent,cocksucking,cockney,cockles,clutched,cluett's,cloverleaf,closeted,cloistered,clinched,clicker,cleve,clergyman,cleats,clarifying,clapped,citations,cinnabar,cinco,chunnel,chumps,chucks,christof,cholinesterase,choirboy,chocolatey,chlamydia,chili's,chigliak,cheesie,cheeses,chechnya,chauvinistic,chasm,chartreuse,charnier,chapil,chapel's,chalked,chadway,cerveza,cerulean,certifiably,celsius,cellulite,celled,ceiling's,cavalry's,cavalcade,catty,caters,cataloging,casy,castrated,cassio,cashman's,cashews,carwash,cartouche,carnivore,carcinogens,carasco's,carano's,capulet,captives,captivated,capt'n,capsized,canoes,cannes,candidate's,cancellations,camshaft,campin,callate,callar,calendar's,calculators,cair,caffeinated,cadavers,cacophony,cackle,byproduct,bwana,buzzes,buyout,buttoning,busload,burglaries,burbs,bura,buona,bunions,bungalows,bundles,bunches,bullheaded,buffs,bucyk,buckling,bruschetta,browbeating,broomsticks,broody,bromly,brolin,brigadier,briefings,bridgeport,brewskies,breathalyzer,breakups,breadth,bratwurst,brania,branching,braiding,brags,braggin,bradywood,bozo's,bottomed,bottom's,bottling,botany,boston's,bossa,bordello,booo,bookshelf,boogida,bondsman,bolsheviks,bolder,boggles,boarder,boar's,bludgeoned,blowtorch,blotter,blips,blends,blemish,bleaching,blainetologists,blading,blabbermouth,bismarck,bishops,biscayne,birdseed,birdcage,bionic,biographies,biographical,bimmel,biloxi,biggly,bianchinni,bette's,betadine,berg's,berenson,belus,belt's,belly's,belloq,bella's,belfast,behavior's,begets,befitting,beethoven's,beepers,beelzebub,beefed,bedroom's,bedrock,bedridden,bedevere,beckons,beckett's,beauty's,beaded,baubles,bauble,battlestar,battleground,battle's,bathrobes,basketballs,basements,barroom,barnacle,barkin,barked,barium,baretta,bangles,bangler,banality,bambang,baltar,ballplayers,baio,bahrain,bagman,baffles,backstroke,backroom,bachelor's,babysat,babylonian,baboons,aviv,avez,averse,availability,augmentation,auditory,auditor,audiotape,auctioneer,atten,attained,attackers,atcha,astonishment,asshole's,assembler,arugula,arsonist's,arroz,arigato,arif,ardent,archaic,approximation,approving,appointing,apartheid,antihistamines,antarctica,annoyances,annals,annabelle's,angrily,angelou,angelo's,anesthesiology,android,anatomically,anarchists,analyse,anachronism,amiable,amex,ambivalent,amassed,amaretto,alumnus,alternating,alternates,alteration,aloft,alluding,allen's,allahu,alight,alfred's,alfie,airlift,aimin,ailment,aground,agile,ageing,afterglow,africans,affronte,affectionately,aerobic,adviser,advil,adventist,advancements,adrenals,admiral's,administrators,adjutant,adherence,adequately,additives,additions,adapting,adaptable,actualization,activating,acrost,ached,accursed,accoutrements,absconded,aboveboard,abou,abetted,abbot's,abbey's,aargh,aaaahh,zuzu's,zuwicky,zolda,zits,ziploc,zakamatak,yutz,yumm,youve,yolk,yippie,yields,yiddish,yesterdays,yella,yearns,yearnings,yearned,yawning,yalta,yahtzee,yacht's,y'mean,y'are,xand,wuthering,wreaks,woul,worsened,worrisome,workstation,workiiing,worcestershire,woop,wooooooo,wooded,wonky,womanizing,wolodarsky,wnkw,wnat,wiwith,withdraws,wishy,wisht,wipers,wiper,winos,winery,windthorne,windsurfing,windermere,wiggles,wiggled,wiggen,whys,whwhat,whuh,whos,whore's,whodunit,whoaaa,whittling,whitesnake,whirling,whereof,wheezing,wheeze,whatley's,whatd'ya,whataya,whammo,whackin,wets,westbound,wellll,wellesley,welch's,weirdo's,weightless,weevil,wedgies,webbing,weasly,weapon's,wean,wayside,waxes,wavelengths,waturi,washy,washrooms,warton's,wandell,wakeup,waitaminute,waddya,wabash,waaaah,vornac,voir,voicing,vocational,vocalist,vixens,vishnoor,viscount,virulent,virtuoso,vindictiveness,vinceres,vince's,villier,viii,vigeous,viennese,viceroy,vestigial,vernacular,venza's,ventilate,vented,venereal,vell,vegetative,veering,veered,veddy,vaslova,valosky,vailsburg,vaginas,vagas,vacation's,uuml,urethra,upstaged,uploading,upgrades,unwrapping,unwieldy,untenable,untapped,unsatisfied,unsatisfactory,unquenchable,unnerved,unmentionable,unlovable,unknowns,universes,uninformed,unimpressed,unhappily,unguarded,unexplored,underpass,undergarment,underdeveloped,undeniably,uncompromising,unclench,unclaimed,uncharacteristically,unbuttoned,unblemished,unas,umpa,ululd,uhhhm,tweeze,tutsami,tusk,tushy,tuscarora,turkle,turghan,turbulent,turbinium,tuffy,tubers,tsun,trucoat,troxa,trou,tropicana,triquetra,tripled,trimmers,triceps,tribeca,trespassed,traya,travellers,traumatizing,transvestites,transatlantic,tran's,trainors,tradin,trackers,townies,tourelles,toughness,toucha,totals,totalled,tossin,tortious,topshop,topes,tonics,tongs,tomsk,tomorrows,toiling,toddle,tobs,tizzy,tiramisu,tippers,timmi,timbre,thwap,thusly,ththe,thruway,thrusts,throwers,throwed,throughway,thrice,thomas's,thickening,thia,thermonuclear,therapy's,thelwall,thataway,th's,textile,texans,terry's,terrifically,tenets,tendons,tendon,telescopic,teleportation,telepathically,telekinetic,teetering,teaspoons,teamsters,taunts,tatoo,tarantulas,tapas,tanzania,tanned,tank's,tangling,tangerine,tamales,tallied,tailors,tai's,tahitian,tag's,tactful,tackles,tachy,tablespoon,tableau,syrah,syne,synchronicity,synch,synaptic,synapses,swooning,switchman,swimsuits,swimmer's,sweltering,swelling's,sweetly,sweeper,suvolte,suss,suslov,surname,surfed,supremacy,supposition,suppertime,supervillains,superman's,superfluous,superego,sunspots,sunnydale's,sunny's,sunning,sunless,sundress,sump,suki,suffolk,sue's,suckah,succotash,substation,subscriptions,submarines,sublevel,subbasement,styled,studious,studio's,striping,stresses,strenuously,streamlined,strains,straights,stony,stonewalled,stonehenge,stomper,stipulates,stinging,stimulated,stillness,stilettos,stewards,stevesy,steno,sten,stemmed,steenwyck,statesmen,statehood,stargates,standstill,stammering,staedert,squiggly,squiggle,squashing,squaring,spurred,sprints,spreadsheet,spramp,spotters,sporto,spooking,sponsorship,splendido,spittin,spirulina,spiky,speculations,spectral,spate,spartacus,spans,spacerun,sown,southbound,sorr,sorcery,soonest,sono,sondheim,something'll,someth,somepin,someone'll,solicitor,sofas,sodomy,sobs,soberly,sobered,soared,soapy,snowmen,snowbank,snowballing,snorkel,snivelling,sniffling,snakeskin,snagging,smush,smooter,smidgen,smackers,smackdown,slumlord,slugging,slossum,slimmer,slighted,sleepwalk,sleazeball,skokie,skirmishes,skipper's,skeptic,sitka,sitarides,sistah,sipped,sindell,simpletons,simp,simony,simba's,silkwood,silks,silken,silicone,sightless,sideboard,shuttles,shrugging,shrouds,showy,shoveled,shouldn'ta,shoplifters,shitstorm,shipyard,shielded,sheldon's,sheeny,shaven,shapetype,shankar,shaming,shallows,shale,shading,shackle,shabbily,shabbas,severus,settlements,seppuku,senility,semite,semiautomatic,semester's,selznick,secretarial,sebacio,sear,seamless,scuzzy,scummy,scud,scrutinized,scrunchie,scriptures,scribbled,scouted,scotches,scolded,scissor,schooner,schmidt's,schlub,scavenging,scarin,scarfing,scarecrow's,scant,scallions,scald,scabby,say's,savour,savored,sarcoidosis,sandbar,saluted,salted,salish,saith,sailboats,sagittarius,sagan,safeguards,sacre,saccharine,sacamano,sabe,rushdie,rumpled,rumba,rulebook,rubbers,roughage,rotterdam,roto,rotisserie,rosebuds,rootie,roosters,roosevelt's,rooney's,roofy,roofie,romanticize,roma's,rolodex,rolf's,roland's,rodney's,robotic,robin's,rittle,ristorante,rippin,rioting,rinsing,ringin,rincess,rickety,rewritten,revising,reveling,rety,retreats,retest,retaliating,resumed,restructuring,restrict,restorative,reston,restaurateur,residences,reshoots,resetting,resentments,rescuers,rerouted,reprogramming,reprisals,reprisal,repossess,repartee,renzo,renfield,remore,remitting,remeber,reliability,relaxants,rejuvenate,rejections,rehu,regularity,registrar's,regionals,regimes,regenerated,regency,refocus,referrals,reeno,reelected,redevelopment,recycles,recrimination,recombinant,reclining,recanting,recalling,reattach,reassigning,realises,reactors,reactionary,rbis,razor's,razgul,raved,rattlesnakes,rattles,rashly,raquetball,rappers,rapido,ransack,rankings,rajah,raisinettes,raheem,radisson,radishes,radically,radiance,rabbi's,raban,quoth,qumari,quints,quilts,quilting,quien,queue,quarreled,qualifying,pygmy,purty,puritans,purblind,puppy's,punctuation,punchbowl,puget,publically,psychotics,psychopaths,psychoanalyze,pruning,provasik,protruding,protracted,protons,protections,protectin,prospector,prosecutor's,propping,proportioned,prophylactic,propelled,proofed,prompting,prompter,professed,procreate,proclivities,prioritizing,prinze,princess's,pricked,press'll,presets,prescribes,preocupe,prejudicial,prefex,preconceived,precipice,preamble,pram,pralines,pragmatist,powering,powerbar,pottie,pottersville,potsie,potholes,potency,posses,posner's,posies,portkey,porterhouse,pornographers,poring,poppycock,poppet,poppers,poopsie,pomponi,pokin,poitier,poes,podiatry,plush,pleeze,pleadings,playbook,platelets,plane'arium,placebos,place'll,pj's,pixels,pitted,pistachios,pisa,pirated,pirate's,pinochle,pineapples,pinafore,pimples,piggly,piggies,pie's,piddling,picon,pickpockets,picchu,physiologically,physic,photo's,phobic,philosophies,philosophers,philly's,philandering,phenomenally,pheasants,phasing,phantoms,pewter,petticoat,petronis,petitioning,perturbed,perth,persists,persians,perpetuating,permutat,perishable,periphery,perimeters,perfumed,percocet,per'sus,pepperjack,pensioners,penalize,pelting,pellet,peignoir,pedicures,pedestrians,peckers,pecans,payback's,pay's,pawning,paulsson,pattycake,patrolmen,patrolled,patois,pathos,pasted,passer,partnerships,parp,parishioners,parishioner,parcheesi,parachuting,pappa,paperclip,papayas,paolo's,pantheon,pantaloons,panhandle,pampers,palpitations,paler,palantine,paintballing,pago,owow,overtired,overstress,oversensitive,overnights,overexcited,overanxious,overachiever,outwitted,outvoted,outnumber,outlived,outlined,outlast,outlander,outfield,out've,ortolani's,orphey,ornate,ornamental,orienteering,orchestrating,orator,oppressive,operator's,openers,opec,ooky,oliver's,olde,okies,okee,ohhhhhhhhh,ohhhhhhhh,ogling,offline,offbeat,oceanographic,obsessively,obeyed,oaths,o'leary's,o'hana,o'bannon,o'bannion,numpce,nummy,nuked,nuff,nuances,nourishing,noticeably,notably,nosedive,northeastern,norbu,nomlies,nomine,nomads,noge,nixed,niro,nihilist,nightshift,newmeat,nevis,nemo's,neighborhood's,neglectful,neediness,needin,necromancer,neck's,ncic,nathaniel's,nashua,naphthalene,nanotechnology,nanocytes,nanite,naivete,nacho,n'yeah,mystifying,myhnegon,mutating,muskrat,musing,museum's,muppets,mumbles,mulled,muggy,muerto,muckraker,muchachos,mris,move's,mourners,mountainside,moulin,mould,motherless,motherfuck,mosquitos,morphed,mopped,moodoo,montage,monsignor,moncho,monarchs,mollem,moisturiser,moil,mohicans,moderator,mocks,mobs,mizz,mites,mistresses,misspent,misinterpretation,mishka,miscarry,minuses,minotaur,minoan,mindee,mimicking,millisecond,milked,militants,migration,mightn't,mightier,mierzwiak,midwives,micronesia,microchips,microbes,michele's,mhmm,mezzanine,meyerling,meticulously,meteorite,metaphorical,mesmerizing,mershaw,meir,meg's,meecrob,medicate,medea,meddled,mckinnons,mcgewan,mcdunnough,mcats,mbien,maytag,mayors,matzah,matriarch,matic,mathematicians,masturbated,masselin,marxist,martyrs,martini's,martialed,marten's,marlboros,marksmanship,marishka,marion's,marinate,marge's,marchin,manifestations,manicured,mandela,mamma's,mame,malnourished,malk,malign,majorek,maidens,mahoney's,magnon,magnificently,maestro's,macking,machiavellian,macdougal,macchiato,macaws,macanaw,m'self,lynx,lynn's,lyman's,lydells,lusts,lures,luna's,ludwig's,lucite,lubricants,louise's,lopper,lopped,loneliest,lonelier,lomez,lojack,localized,locale,loath,lloyd's,literate,liquidated,liquefy,lippy,linguistic,limps,lillian's,likin,lightness,liesl,liebchen,licious,libris,libation,lhamo,lewis's,leveraged,leticia's,leotards,leopards,leonid,leonardo's,lemmings,leland's,legitimacy,leanin,laxatives,lavished,latka,later's,larval,lanyard,lans,lanky,landscaping,landmines,lameness,lakeshore,laddies,lackluster,lacerated,labored,laboratories,l'amour,kyrgyzstan,kreskin,krazy,kovitch,kournikova,kootchy,konoss,know's,knknow,knickety,knackety,kmart,klicks,kiwanis,kitty's,kitties,kites,kissable,kirby's,kingdoms,kindergartners,kimota,kimble's,kilter,kidnet,kidman,kid'll,kicky,kickbacks,kickback,kickass,khrushchev,kholokov,kewpie,kent's,keno,kendo,keller's,kcdm,katrina's,katra,kareoke,kaia,kafelnikov,kabob,ka's,junjun,jumba,julep,jordie,jondy,jolson,jinnah,jeweler's,jerkin,jenoff,jefferson's,jaye's,jawbone,janitorial,janiro,janie's,iron's,ipecac,invigorated,inverted,intruded,intros,intravenously,interruptus,interrogations,interracial,interpretive,internment,intermediate,intermediary,interject,interfacing,interestin,insuring,instilled,instantaneous,insistence,insensitivity,inscrutable,inroads,innards,inlaid,injector,initiatives,inhe,ingratitude,infuriates,infra,informational,infliction,infighting,induction,indonesian,indochina,indistinguishable,indicators,indian's,indelicate,incubators,incrimination,increments,inconveniencing,inconsolable,incite,incestuous,incas,incarnation,incarcerate,inbreeding,inaccessible,impudence,impressionists,implemented,impeached,impassioned,impacts,imipenem,idling,idiosyncrasies,icicle,icebreaker,icebergs,i'se,hyundai,hypotensive,hydrochloride,huuh,hushed,humus,humph,hummm,hulking,hubcaps,hubald,http,howya,howbout,how'll,houseguests,housebroken,hotwire,hotspots,hotheaded,horticulture,horrace,horde,horace's,hopsfield,honto,honkin,honeymoons,homophobia,homewrecker,hombres,hollow's,hollers,hollerin,hokkaido,hohh,hogwarts,hoedown,hoboes,hobbling,hobble,hoarse,hinky,himmler,hillcrest,hijacking,highlighters,hiccup,hibernation,hexes,heru'ur,hernias,herding,heppleman,henderson's,hell're,heine's,heighten,heheheheheh,heheheh,hedging,heckling,heckled,heavyset,heatshield,heathens,heartthrob,headpiece,headliner,he'p,hazelnut,hazards,hayseed,haveo,hauls,hattie's,hathor's,hasten,harriers,harridan,harpoons,harlin's,hardens,harcesis,harbouring,hangouts,hangman,handheld,halkein,haleh,halberstam,hairpin,hairnet,hairdressers,hacky,haah,haaaa,h'yah,gyms,gusta,gushy,gusher,gurgling,gunnery,guilted,guilt's,gruel,grudging,grrrrrr,grouse,grossing,grosses,groomsmen,griping,gretchen's,gregorian,gray's,gravest,gratified,grated,graphs,grandad,goulash,goopy,goonies,goona,goodman's,goodly,goldwater,godliness,godawful,godamn,gobs,gob's,glycerin,glutes,glowy,glop,globetrotters,glimpsed,glenville,glaucoma,girlscout,giraffes,gimp,gilbey,gil's,gigglepuss,ghora,gestating,geologists,geographically,gelato,gekko's,geishas,geek's,gearshift,gear's,gayness,gasped,gaslighting,garretts,garba,gams,gags,gablyczyck,g'head,fungi,fumigating,fumbling,fulton's,fudged,fuckwad,fuck're,fuchsia,fruition,freud's,fretting,freshest,frenchies,freezers,fredrica,fraziers,francesca's,fraidy,foxholes,fourty,fossilized,forsake,formulate,forfeits,foreword,foreclosed,foreal,foraging,footsies,focussed,focal,florists,flopped,floorshow,floorboard,flinching,flecks,flavours,flaubert,flatware,flatulence,flatlined,flashdance,flail,flagging,fizzle,fiver,fitzy,fishsticks,finster,finetti,finelli,finagle,filko,filipino,figurines,figurative,fifi,fieldstone,fibber,fiance's,feuds,feta,ferrini,female's,feedin,fedora,fect,feasting,favore,fathering,farrouhk,farmin,far's,fanny's,fajita,fairytale,fairservice,fairgrounds,fads,factoid,facet,facedown,fabled,eyeballin,extortionist,exquisitely,exporting,explicitly,expenditures,expedited,expands,exorcise,existentialist,exhaustive,execs,exculpatory,excommunicated,exacerbate,everthing,eventuality,evander,eustace,euphoric,euphemisms,eton,esto,estimation,estamos,establishes,erred,environmentalist,entrepreneurial,entitle,enquiries,enormity,engages,enfants,enen,endive,end's,encyclopedias,emulating,emts,employee's,emphasized,embossed,embittered,embassies,eliot,elicit,electrolyte,ejection,effortless,effectiveness,edvard,educators,edmonton's,ecuador,ectopic,ecirc,easely,earphones,earmarks,earmarked,earl's,dysentery,dwindling,dwight's,dweller,dusky,durslar,durned,dunois,dunking,dunked,dumdum,dullard,dudleys,duce,druthers,druggist,drug's,drossos,drosophila,drooled,driveways,drippy,dreamless,drawstring,drang,drainpipe,dragoons,dozing,down's,dour,dougie's,dotes,dorsal,dorkface,doorknobs,doohickey,donnell's,donnatella,doncha,don's,dominates,domicile,dokos,dobermans,djez,dizzying,divola,dividends,ditsy,distaste,disservice,disregarded,dispensed,dismay,dislodged,dislodge,disinherit,disinformation,discrete,discounting,disciplines,disapproved,dirtball,dinka,dimly,dilute,dilucca's,digesting,diello,diddling,dictatorships,dictators,diagonal,diagnostician,devours,devilishly,detract,detoxing,detours,detente,destructs,desecrated,descends,derris,deplore,deplete,depicts,depiction,depicted,denver's,denounce,demure,demolitions,demean,deluge,dell's,delish,deliberation,delbruck,delaford,deities,degaulle,deftly,deft,deformity,deflate,definatly,defense's,defector,deducted,decrypted,decontamination,decker's,decapitate,decanter,deadline's,dardis,danger's,dampener,damme,daddy'll,dabbling,dabbled,d'etre,d'argent,d'alene,d'agnasti,czechs,czechoslovakian,cyrillic,cymbal,cyberdyne,cutoffs,cuticle,cut's,curvaceous,curiousity,curfew's,culturally,cued,cubby,cruised,crucible,crowing,crowed,croutons,cropped,croaker,cristobel's,criminy,crested,crescentis,cred,cream's,crashers,crapola,cranwell,coverin,cousteau,courtrooms,counterattack,countenance,counselor's,cottages,cosmically,cosign,cosa,corroboration,corresponds,correspond,coroners,coro,cornflakes,corbett's,copy's,copperpot,copperhead,copacetic,coordsize,convulsing,contradicted,contract's,continuation,consults,consultations,constraints,conjures,congenial,confluence,conferring,confederation,condominium,concourse,concealer,compulsory,complexities,comparatively,compactor,commodities,commercialism,colleague's,collaborator,cokey,coiled,cognizant,cofell's,cobweb,co's,cnbc,clyde's,clunkers,clumsily,clucking,cloves,cloven,cloths,clothe,clop,clods,clocking,clings,climbers,clef,clearances,clavicle,claudia's,classless,clashing,clanking,clanging,clamping,civvies,citywide,citing,circulatory,circuited,circ,chung's,chronisters,chromic,choppy,choos,chongo,chloroformed,chilton's,chillun,chil,chicky,cheetos,cheesed,chatterbox,charlies,chaperoned,channukah,chamberlain's,chairman's,chaim,cessation,cerebellum,centred,centerpieces,centerfold,cellars,ceecee,ccedil,cavorting,cavemen,cavaliers,cauterized,caustic,cauldwell,catting,cathy's,caterine,castor's,cassiopeia,cascade's,carves,cartwheel,cartridges,carpeted,carob,carlsbad,caressing,carelessly,careening,carcinoma,capricious,capitalistic,capillaries,capes,candle's,candidly,canaan,camaraderie,calumet,callously,calligraphy,calfskin,cake's,caddies,cabinet's,buzzers,buttholes,butler's,busywork,busses,burps,burgomeister,buoy,bunny's,bunkhouse,bungchow,bulkhead,builders,bugler,buffets,buffed,buckaroo's,brutish,brusque,browser,bronchitis,bromden,brolly,brody's,broached,brewskis,brewski,brewin,brewers,brean,breadwinner,brana,brackets,bozz,bountiful,bounder,bouncin,bosoms,borgnine,bopping,bootlegs,booing,bons,boneyard,bombosity,bolting,bolivia,boilerplate,boba,bluey,blowback,blouses,bloodsuckers,bloodstained,blonde's,bloat,bleeth,blazed,blaine's,blackhawk,blackface,blackest,blackened,blacken,blackballed,blabs,blabbering,birdbrain,bipartisanship,biodegradable,binghamton,biltmore,billiards,bilked,big'uns,bidwell's,bidet,bessie's,besotted,beset,berth,bernheim,benson's,beni,benegas,bendiga,belushi,beltway,bellboys,belittling,belinda's,behinds,behemoth,begone,beeline,beehive,bedsheets,beckoning,beaute,beaudine,beastly,beachfront,be's,bauk,bathes,batak,bastion,baser,baseballs,barker's,barber's,barbella,bans,bankrolling,bangladesh,bandaged,bamba,bally's,bagpipe,bagger,baerly,backlog,backin,babying,azkaban,ayatollah,axes,awwwww,awakens,aviary,avery's,autonomic,authorizes,austero,aunty,augustine's,attics,atreus,astronomers,astounded,astonish,assertion,asserting,assailants,asha's,artemus,arses,arousal,armin,arintero,argon's,arduous,archers,archdiocese,archaeology,arbitrarily,ararat,appropriated,appraiser,applicable,apathetic,anybody'd,anxieties,anwar's,anticlimactic,antar,ankle's,anima,anglos,angleman,anesthetist,androscoggin,andromeda,andover,andolini,andale,anan,amway,amuck,amphibian,amniocentesis,amnesiac,ammonium,americano,amara,alway,alvah,alum,altruism,alternapalooza,alphabetize,alpaca,almanac,ally's,allus,alluded,allocation,alliances,allergist,alleges,alexandros,alec's,alaikum,alabam,akimbo,airy,ahab's,agoraphobia,agides,aggrhh,agatha's,aftertaste,affiliations,aegis,adoptions,adjuster,addictions,adamantium,acumen,activator,activates,acrylic,accomplishes,acclaimed,absorbs,aberrant,abbu,aarp,aaaaargh,aaaaaaaaaaaaa,a'ight,zucchini,zoos,zookeeper,zirconia,zippers,zequiel,zephyr's,zellary,zeitgeist,zanuck,zambia,zagat,ylang,yielded,yes'm,yenta,yegg,yecchh,yecch,yayo,yawp,yawns,yankin,yahdah,yaaah,y'got,xeroxed,wwooww,wristwatch,wrangled,wouldst,worthiness,wort,worshiping,worsen,wormy,wormtail,wormholes,woosh,woodworking,wonka,womens,wolverines,wollsten,wolfing,woefully,wobbling,witter's,wisp,wiry,wire's,wintry,wingding,windstorm,windowtext,wiluna,wilting,wilted,willick,willenholly,wildflowers,wildebeest,wilco,wiggum,wields,widened,whyyy,whoppers,whoaa,whizzing,whizz,whitest,whitefish,whistled,whist,whinny,whereupon,whereby,wheelies,wheaties,whazzup,whatwhatwhaaat,whato,whatdya,what'dya,whar,whacks,wexler's,wewell,wewe,wetsuit,wetland,westport,welluh,weight's,weeps,webpage,waylander,wavin,watercolors,wassail,wasnt,warships,warns,warneford,warbucks,waltons,wallbanger,waiving,waitwait,vowing,voucher,vornoff,vork,vorhees,voldemort,vivre,vittles,vishnu,vips,vindaloo,videogames,victors,vicky's,vichyssoise,vicarious,vet's,vesuvius,verve,verguenza,venturing,ventura's,venezuelan,ven't,velveteen,velour,velociraptor,vegetation,vaudeville,vastness,vasectomies,vapors,vanderhof,valmont,validates,valiantly,valerian,vacuums,vaccines,uzbekistan,usurp,usernum,us'll,urinals,unyielding,unwillingness,unvarnished,unturned,untouchables,untangled,unsecured,unscramble,unreturned,unremarkable,unregistered,unpublished,unpretentious,unopposed,unnerstand,unmade,unlicensed,unites,union's,uninhabited,unimpeachable,unilateral,unicef,unfolded,unfashionable,undisturbed,underwriting,underwrite,underlining,underling,underestimates,underappreciated,undamaged,uncouth,uncork,uncontested,uncommonly,unclog,uncircumcised,unchallenged,uncas,unbuttoning,unapproved,unamerican,unafraid,umpteen,umhmm,uhwhy,uhmm,ughuh,ughh,ufo's,typewriters,twitches,twitched,twirly,twinkling,twink,twinges,twiddling,twiddle,tutored,tutelage,turners,turnabout,ture,tunisian,tumultuous,tumour,tumblin,tryed,truckin,trubshaw's,trowel,trousseau,trivialize,trifles,tribianni,trib,triangulation,trenchcoat,trembled,traumatize,transplanted,translations,transitory,transients,transfuse,transforms,transcribing,transcend,tranq,trampy,traipsed,trainin,trail's,trafalgar,trachea,traceable,touristy,toughie,totality,totaling,toscanini,tortola,tortilla,tories,toreador,tooo,tonka,tommorrow,tollbooth,tollans,toidy,togs,togas,tofurkey,toddling,toddies,tobruk,toasties,toadstool,to've,tive,tingles,timin,timey,timetables,tightest,tide's,tibetans,thunderstorms,thuggee,thrusting,thrombus,throes,throated,thrifty,thoroughbred,thornharts,thinnest,thicket,thetas,thesulac,tethered,testimonial,testaburger,tersenadine,terrif,teresa's,terdlington,tepui,tenured,tentacle,temping,temperance,temp's,teller's,televisions,telefono,tele,teddies,tector,taxidermy,taxi's,taxation,tastebuds,tasker's,tartlets,tartabull,tard,tar'd,tantamount,tans,tangy,tangles,tamer,talmud,taiwan's,tabula,tabletops,tabithia,tabernacle,szechwan,syrian,synthedyne,synopsis,synonyms,swaps,swahili,svenjolly,svengali,suvs,sush,survivalists,surmise,surfboards,surefire,suprise,supremacists,suppositories,supervisors,superstore,supermen,supercop,supercilious,suntac,sunburned,summercliff,sullied,suite's,sugared,sufficiency,suerte,suckle,sucker's,sucka,succumbing,subtleties,substantiated,subsidiaries,subsides,subliminal,subhuman,stst,strowman,stroked,stroganoff,strikers,strengthening,streetlight,straying,strainer,straighter,straightener,storytelling,stoplight,stockade,stirrups,stink's,sting's,stimulates,stifler's,stewing,stetson's,stereotyping,ster,stepmommy,stephano,steeped,statesman,stashing,starshine,stand's,stamping,stamford,stairwells,stabilization,squatsie,squandering,squalid,squabbling,squab,sprinkling,spring's,spreader,spongy,spongebob,spokeswoman,spokesmen,splintered,spittle,spitter,spiced,spews,spendin,spect,speckled,spearchucker,spatulas,sparse,sparking,spares,spaceboy,soybeans,southtown,southside,southport,southland,soused,sotheby's,soshi,sorter,sorrowful,sorceress,sooth,songwriters,some'in,solstice,soliloquy,sods,sodomized,sode,sociologist,sobriki,soaping,snows,snowcone,snowcat,snitching,snitched,sneering,snausages,snaking,smoothed,smoochies,smolensk,smarten,smallish,slushy,slurring,sluman,slobber,slithers,slippin,sleuthing,sleeveless,slade's,skinner's,skinless,skillfully,sketchbook,skagnetti,sista,sioux,sinning,sinjin,singularly,sinewy,sinclair's,simultaneous,silverlake,silva's,siguto,signorina,signature's,signalling,sieve,sids,sidearms,shyster,shying,shunning,shtud,shrooms,shrieks,shorting,shortbread,shopkeepers,shmuck,shmancy,shizzit,shitheads,shitfaced,shitbag,shipmates,shiftless,sherpa,shelving,shelley's,sheik,shedlow,shecky,sheath,shavings,shatters,sharifa,shampoos,shallots,shafter,sha'nauc,sextant,settlers,setter,seti,serviceable,serrated,serbian,sequentially,sepsis,senores,sendin,semis,semanski,seller's,selflessly,selects,selectively,seinfelds,seers,seer's,seeps,see's,seductress,sedimentary,sediment,second's,secaucus,seater,seashore,sealant,seaborn's,scuttling,scusa,sculpting,scrunched,scrimmage,screenwriter,scotsman,scorer,sclerosis,scissorhands,schreber,scholastic,schmancy,schlong,scathing,scandinavia,scamps,scalloped,savoir,savagery,sasha's,sarong,sarnia,santangel,samool,samba,salons,sallow,salino,safecracker,sadism,saddles,sacrilegious,sabrini,sabath,s'aright,ruttheimer,russia's,rudest,rubbery,rousting,rotarian,roslin,rosey,rosa's,roomed,romari,romanticism,romanica,rolltop,rolfski,rod's,rockland,rockettes,roared,riverfront,rinpoche,ringleader,rims,riker's,riffing,ricans,ribcage,riana's,rhythmic,rhah,rewired,retroactive,retrial,reting,reticulum,resuscitated,resuming,restricting,restorations,restock,resilience,reservoirs,resembled,resale,requisitioned,reprogrammed,reproducing,repressive,replicant,repentant,repellant,repays,repainting,reorganization,renounced,renegotiating,rendez,renamed,reminiscent,remem,remade,relived,relinquishes,reliant,relearn,relaxant,rekindling,rehydrate,regulatory,regiments,regan's,refueled,refrigeration,refreshingly,reflector,refine,refilling,reexamine,reeseman,redness,redirected,redeemable,redder,redcoats,rectangles,recoup,reconstituted,reciprocated,recipients,recessed,recalls,rebounded,reassessing,realy,reality's,realisation,realer,reachin,re'kali,rawlston,ravages,rattlers,rasa,raps,rappaports,ramoray,ramming,ramadan,raindrops,rahesh,radioactivity,radials,racists,racin,rabartu,quotas,quintus,quiches,ques,queries,quench,quel,quarrels,quarreling,quaintly,quagmire,quadrants,pylon,putumayo,put'em,purifier,purified,pureed,punitis,pullout,pukin,pudgy,puddings,puckering,puccini,pterodactyl,psychodrama,pseudonym,psats,proximal,providers,protestations,protectee,prospered,prosaic,propositioned,prolific,progressively,proficiency,professions,prodigious,proclivity,probed,probabilities,pro's,prison's,printouts,principally,prig,prevision,prevailing,presumptive,pressers,preset,presentations,preposition,preparatory,preliminaries,preempt,preemie,predetermined,preconceptions,precipitate,prancan,powerpuff,powerfully,potties,potters,potpie,poseur,portraying,portico,porthole,portfolios,poops,pooping,pone,pomp,pomade,polyps,polymerized,politic,politeness,polisher,polack,pokers,pocketknife,poatia,plebeian,playgroup,platonically,plato's,platitude,platelet,plastering,plasmapheresis,plaques,plaids,placemats,place's,pizzazz,piracy,pipelines,pip's,pintauro,pinstripes,pinpoints,pinkner,pincer,pimento,pillaged,pileup,pilates,pigment,pigmen,pieter,pieeee,picturesque,piano's,phrasing,phrased,photojournalist,photocopies,phosphorus,phonograph,phoebes,phoe,philistines,philippine,philanderer,pheromone,phasers,pharaoh's,pfff,pfeffernuesse,petrov,petitions,peterman's,peso,pervs,perspire,personify,perservere,perplexed,perpetrating,perp's,perkiness,perjurer,periodontist,perfunctory,performa,perdido,percodan,penzance,pentameter,pentagon's,pentacle,pensive,pensione,pennybaker,pennbrooke,penhall,pengin,penetti,penetrates,pegs,pegnoir,peeve,peephole,pectorals,peckin,peaky,peaksville,payout,paxcow,paused,pauline's,patted,pasteur,passe,parochial,parkland,parkishoff,parkers,pardoning,paraplegic,paraphrasing,parapet,paperers,papered,panoramic,pangs,paneling,pander,pandemonium,pamela's,palooza,palmed,palmdale,palisades,palestinian,paleolithic,palatable,pakistanis,pageants,packaged,pacify,pacified,oyes,owwwww,overthrown,overt,oversexed,overriding,overrides,overpaying,overdrawn,overcompensate,overcomes,overcharged,outtakes,outmaneuver,outlying,outlining,outfoxed,ousted,oust,ouse,ould,oughtn't,ough,othe,ostentatious,oshun,oscillation,orthopedist,organizational,organization's,orca,orbits,or'derves,opting,ophthalmologist,operatic,operagirl,oozes,oooooooh,only's,onesie,omnis,omelets,oktoberfest,okeydoke,ofthe,ofher,obstetrics,obstetrical,obeys,obeah,o'rourke,o'reily's,o'henry,nyquil,nyanyanyanyah,nuttin,nutsy,nutrients,nutball,nurhachi,numbskull,nullifies,nullification,nucking,nubbin,ntnt,nourished,notoriety,northland,nonspecific,nonfiction,noing,noinch,nohoho,nobler,nitwits,nitric,nips,nibs,nibbles,newton's,newsprint,newspaperman,newspaper's,newscaster,never's,neuter,neuropathy,netherworld,nests,nerf,neee,neediest,neath,navasky,naturalization,nat's,narcissists,napped,nando,nags,nafta,myocardial,mylie's,mykonos,mutilating,mutherfucker,mutha,mutations,mutates,mutate,musn't,muskets,murray's,murchy,mulwray's,multitasking,muldoon's,mujeeb,muerte,mudslinging,muckraking,mrsa,mown,mousie,mousetrap,mourns,mournful,motivating,motherland,motherf,mostro,mosaic,morphing,morphate,mormons,moralistic,moored,moochy,mooching,monotonous,monorail,monopolize,monogram,monocle,molehill,molar,moland,mofet,modestly,mockup,moca,mobilizing,mitzvahs,mitre,mistreating,misstep,misrepresentation,misjudge,misinformation,miserables,misdirected,miscarriages,minute's,miniskirt,minimizing,mindwarped,minced,milquetoast,millimeters,miguelito,migrating,mightily,midsummer,midstream,midriff,mideast,midas,microbe,metropolis,methuselah,mesdames,mescal,mercury's,menudo,menu's,mentors,men'll,memorial's,memma,melvins,melanie's,megaton,megara,megalomaniac,meeee,medulla,medivac,mediate,meaninglessness,mcnuggets,mccarthyism,maypole,may've,mauve,maturing,matter's,mateys,mate's,mastering,masher,marxism,martimmy's,marshack,marseille,markles,marketed,marketable,mansiere,manservant,manse,manhandling,manco's,manana,maman,malnutrition,mallomars,malkovich's,malcontent,malaise,makeup's,majesties,mainsail,mailmen,mahandra,magnolias,magnified,magev,maelstrom,madcap,mack's,machu,macfarlane's,macado,ma'm,m'boy,m'appelle,lying's,lustrous,lureen,lunges,lumped,lumberyard,lulled,luego,lucks,lubricated,loveseat,loused,lounger,loski,lorre,loora,looong,loonies,lonnegan's,lola's,loire,loincloth,logistical,lofts,lodges,lodgers,lobbing,loaner,livered,lithuania,liqueur,linkage,ling's,lillienfield's,ligourin,lighter's,lifesaving,lifeguards,lifeblood,library's,liberte,liaisons,liabilities,let'em,lesbianism,lenny's,lennart,lence,lemonlyman,legz,legitimize,legalized,legalization,leadin,lazars,lazarro,layoffs,lawyering,lawson's,lawndale's,laugher,laudanum,latte's,latrines,lations,laters,lastly,lapels,lansing's,lan's,lakefront,lait,lahit,lafortunata,lachrymose,laborer,l'italien,l'il,kwaini,kuzmich,kuato's,kruczynski,kramerica,krakatoa,kowtow,kovinsky,koufax,korsekov,kopek,knoxville,knowakowski,knievel,knacks,klux,klein's,kiran,kiowas,kinshasa,kinkle's,kincaid's,killington,kidnapper's,kickoff,kickball,khan's,keyworth,keymaster,kevie,keveral,kenyons,keggers,keepsakes,kechner,keaty,kavorka,katmandu,katan's,karajan,kamerev,kamal's,kaggs,juvi,jurisdictional,jujyfruit,judeo,jostled,joni's,jonestown,jokey,joists,joint's,johnnie's,jocko,jimmied,jiggled,jig's,jests,jessy,jenzen,jensen's,jenko,jellyman,jeet,jedediah,jealitosis,jaya's,jaunty,jarmel,jankle,jagoff,jagielski,jacky,jackrabbits,jabbing,jabberjaw,izzat,iuml,isolating,irreverent,irresponsibly,irrepressible,irregularity,irredeemable,investigator's,inuvik,intuitions,intubated,introspective,intrinsically,intra,intimates,interval,intersections,interred,interned,interminable,interloper,intercostal,interchange,integer,intangible,instyle,instrumentation,instigate,instantaneously,innumerable,inns,injustices,ining,inhabits,ings,ingrown,inglewood,ingestion,ingesting,infusion,infusing,infringing,infringe,inflection,infinitum,infact,inexplicably,inequities,ineligible,industry's,induces,indubitably,indisputable,indirect,indescribably,independents,indentation,indefinable,incursion,incontrovertible,inconsequential,incompletes,incoherently,inclement,inciting,incidentals,inarticulate,inadequacies,imprudent,improvisation,improprieties,imprison,imprinted,impressively,impostors,importante,implicit,imperious,impale,immortalized,immodest,immobile,imbued,imbedded,imbecilic,illustrates,illegals,iliad,idn't,idiom,icons,hysteric,hypotenuse,hygienic,hyeah,hushpuppies,hunhh,hungarians,humpback,humored,hummed,humiliates,humidifier,huggy,huggers,huckster,html,hows,howlin,hoth,hotbed,hosing,hosers,horsehair,homegrown,homebody,homebake,holographic,holing,holies,hoisting,hogwallop,hogan's,hocks,hobbits,hoaxes,hmmmmm,hisses,hippos,hippest,hindrance,hindi,him's,hillbillies,hilarity,highball,hibiscus,heyday,heurh,hershey's,herniated,hermaphrodite,hera,hennifer,hemlines,hemline,hemery,helplessness,helmsley,hellhound,heheheheh,heey,heeey,hedda,heck's,heartbeats,heaped,healers,headstart,headsets,headlong,headlining,hawkland,havta,havana's,haulin,hastened,hasn,harvey'll,harpo,hardass,haps,hanta,hansom,hangnail,handstand,handrail,handoff,hander,han's,hamlet's,hallucinogen,hallor,halitosis,halen,hahah,hado,haberdashery,gypped,guy'll,guni,gumbel,gulch,gues,guerillas,guava,guatemalan,guardrail,guadalajara,grunther,grunick,grunemann's,growers,groppi,groomer,grodin,gris,gripes,grinds,grimaldi's,grifters,griffins,gridlock,gretch,greevey,greasing,graveyards,grandkid,grainy,graced,governed,gouging,gordie's,gooney,googly,golfers,goldmuff,goldenrod,goingo,godly,gobbledygook,gobbledegook,goa'uld's,glues,gloriously,glengarry,glassware,glamor,glaciers,ginseng,gimmicks,gimlet,gilded,giggly,gig's,giambetti,ghoulish,ghettos,ghandi,ghali,gether,get's,gestation,geriatrics,gerbils,gerace's,geosynchronous,georgio,geopolitical,genus,gente,genital,geneticist,generation's,generates,gendarme,gelbman,gazillionth,gayest,gauging,gastro,gaslight,gasbag,garters,garish,garas,garages,gantu,gangy,gangly,gangland,gamer,galling,galilee,galactica's,gaiety,gadda,gacy,futuristic,futs,furrowed,funny's,funnies,funkytown,fundraisers,fundamentalist,fulcrum,fugimotto,fuente,fueling,fudging,fuckup,fuckeen,frutt's,frustrates,froufrou,froot,frontiers,fromberge,frog's,frizzies,fritters,fringes,frightfully,frigate,friendliest,freeloading,freelancing,fredonia,freakazoid,fraternization,frankfurter,francine's,franchises,framers,fostered,fortune's,fornication,fornicating,formulating,formations,forman's,forgeries,forethought,forage,footstool,foisting,focussing,focking,foal,flutes,flurries,fluffed,flourished,florida's,floe,flintstones,fleischman's,fledgling,fledermaus,flayed,flay,flawlessly,flatters,flashbang,flapped,flanking,flamer,fission,fishies,firmer,fireproof,fireman's,firebug,firebird,fingerpainting,finessed,findin,financials,finality,fillets,fighter's,fiercest,fiefdom,fibrosis,fiberglass,fibbing,feudal,festus,fervor,fervent,fentanyl,fenelon,fenders,fedorchuk,feckless,feathering,fearsome,fauna,faucets,farmland,farewells,fantasyland,fanaticism,faltered,fallacy,fairway,faggy,faberge,extremism,extorting,extorted,exterminating,exhumation,exhilaration,exhausts,exfoliate,exemptions,excesses,excels,exasperating,exacting,evoked,evocative,everyman,everybody'd,evasions,evangelical,establishments,espressos,esoteric,esmail,errrr,erratically,eroding,erode,ernswiler,episcopalian,ephemeral,epcot,entrenched,entomology,entomologist,enthralled,ensuing,ensenada,enriching,enrage,enlisting,enhancer,enhancements,endorsing,endear,encrusted,encino,enacted,employing,emperors,empathic,embodied,embezzle,embarked,emanates,elton's,eloquence,eloi,elmwood,elliptical,ellenor's,elemental,electricians,electing,elapsed,eking,egomaniacal,eggo,egging,effected,effacing,eeww,edits,editor's,edging,ectoplasm,economical,ecch,eavesdropped,eastbound,earwig,e'er,durable,dunbar's,dummkopf,dugray,duchaisne,duality,drusilla's,drunkard,drudge,drucilla's,droop,droids,drips,dripped,dribbles,drew's,dressings,drazens,downy,downsize,downpour,dowager,dote,dosages,dorothy's,doppler,doppelganger,dopes,doorman's,doohicky,doof,dontcha,donovon's,doneghy,domi,domes,dojo,documentaries,divinity,divining,divest,diuretics,diuretic,distrustful,distortions,dissident,disrupts,disruptions,disproportionate,dispensary,disparity,dismemberment,dismember,disinfect,disillusionment,disheartening,discriminated,discourteous,discotheque,discolored,disassembled,disabling,dirtiest,diphtheria,dinks,dimpled,digg,diffusion,differs,didya,dickweed,dickwad,dickson's,diatribes,diathesis,diabetics,dewars,deviants,detrimental,detonates,detests,detestable,detaining,despondent,desecration,descriptive,derision,derailing,deputized,depressors,depo,depicting,depict,dependant,dentures,denominators,demur,demonstrators,demonology,delts,dellarte,delinquency,delacour,deflated,definitively,defib,defected,defaced,deeded,decorators,debit,deaqon,davola,datin,dasilva's,darwinian,darling's,darklighters,dandelions,dandelion,dancer's,dampened,dame's,damaskinos,dama,dalrimple,dagobah,dack,d'peshu,d'hoffryn,d'astier,cystic,cynics,cybernetic,cutoff,cutesy,cutaway,customarily,curtain's,cursive,curmudgeon,curdle,cuneiform,cultivated,culpability,culo,cuisinart,cuffing,crypts,cryptid,cryogenic,crux,crunched,crumblers,crudely,crosscheck,croon,crissake,crime's,cribbage,crevasse,creswood,creepo,creases,creased,creaky,cranks,cran,craftsmen,crafting,crabgrass,cowboy's,coveralls,couple'a,councilors,coughs,cotton's,cosmology,coslaw,corresponded,corporeal,corollary,cornucopia,cornering,corks,cordoned,coolly,coolin,cooley's,coolant,cookbooks,converging,contrived,contrite,contributors,contradictory,contra,contours,contented,contenders,contemplated,contact's,constrictor,congressman's,congestion,confrontations,confound,conform,confit,confiscating,conferred,condoned,conditioners,concussions,concentric,conceding,coms,comprised,comprise,comprendo,composers,commuted,commercially,commentator,commentaries,commemorating,commander's,comers,comedic,combustible,combusted,columbo,columbia's,colourful,colonials,collingswood,coliseum,coldness,cojones,coitus,cohesive,cohesion,cohen's,coffey's,codicil,cochran's,coasting,clydesdale,cluttering,clunker,clunk,clumsiness,clumps,clotted,clothesline,clinches,clincher,cleverness,clench,clein,cleave,cleanses,claymores,clarisse,clarissa's,clammed,civilisation,ciudad,circumvent,circulated,circuit's,cinnamon's,cind,church's,chugging,chronically,christsakes,chris's,choque,chompers,choco,chiseling,chirpy,chirp,chinks,chingachgook,chigger,chicklet,chickenpox,chickadee,chewin,chessboard,cherub,chemo's,chauffeur's,chaucer,chariots,chargin,characterizing,chanteuse,chandeliers,chamdo,chalupa,chagrined,chaff,certs,certify,certification,certainties,cerreno,cerebrum,cerebro,century's,centennial,censured,cemetary,cellist,celine's,cedar's,cayo,caterwauling,caterpillars,categorized,catchers,cataclysmic,cassidy's,casitas,casino's,cased,carvel,cartographers,carting,cartels,carriages,carrear,carr's,carolling,carolinas,carolers,carnie,carne,cardiovascular,cardiogram,carbuncle,caramba,capulets,capping,canyons,canines,candaules,canape,canadiens,campaigned,cambodian,camberwell,caldecott,calamitous,caff,cadillacs,cachet,cabeza,cabdriver,byzantium,buzzkill,buzzards,buzz's,buyer's,butai,bustling,businesswomen,bunyan,bungled,bumpkins,bummers,bulletins,bullet's,bulldoze,bulbous,bug's,buffybot,budgeted,budda,bubut,bubbies,brunei,brrrrr,brownout,brouhaha,bronzing,bronchial,broiler,broadening,briskly,briefcases,bricked,breezing,breeher,breckinridge,breakwater,breakable,breadstick,bravenet,braved,brass's,brandies,brandeis,branched,brainwaves,brainiest,braggart,bradlee,boys're,boys'll,boys'd,boyd's,boutonniere,bottle's,bossed,bosomy,bosnian,borans,boosts,boombox,bookshelves,bookmark,booklet,bookends,bontecou's,bongos,boneless,bone's,bond's,bombarding,bombarded,bollo,boinked,boink,boilers,bogart's,bobbo,bobbin,bluest,bluebells,blowjobs,bloodshot,blondie's,blockhead,blockbusters,blithely,blim,bleh,blather,blasters,blankly,bladders,blackhawks,blackbeard,bjorn,bitte,bippy,bios,biohazard,biogenetics,biochemistry,biochemist,bilingual,bilge,bigmouth,bighorn,bigglesworth,bicuspids,beususe,betaseron,besmirch,besieged,bernece,bergman's,bereavement,bentonville,benthic,benjie,benji's,benefactors,benchley,benching,bembe,bellyaching,bellhops,belie,beleaguered,being's,behrle,beginnin,begining,beenie,beefs,beechwood,bee's,bedbug,becau,beaverhausen,beakers,beacon's,bazillion,baudouin,bat's,bartlett's,barrytown,barringtons,baroque,baronet,barneys,barbs,barbers,barbatus,baptists,bankrupted,banker's,bamn,bambi's,ballon's,balinese,bakeries,bailiffs,backslide,baby'd,baaad,b'fore,awwwk,aways,awakes,averages,avengers,avatars,autonomous,automotive,automaton,automatics,autism,authoritative,authenticated,authenticate,aught,audition's,aubyn,attired,attagirl,atrophied,atonement,atherton's,asystole,astroturf,assimilated,assimilate,assertiveness,assemblies,assassin's,artiste,article's,artichokes,arsehole,arrears,arquillians,arnie's,aright,archenemy,arched,arcade's,aquatic,apps,appraise,applauded,appendages,appeased,apostle,apollo's,antwerp,antler,antiquity,antin,antidepressant,antibody,anthropologists,anthology,anthea,antagonism,ant's,anspaugh,annually,anka,angola,anesthetics,anda,ancients,anchoring,anaphylactic,anaheim,ana's,amtrak,amscray,amputated,amounted,americas,amended,ambivalence,amalio,amah,altoid,alriiight,alphabetized,alpena,alouette,allowable,allora,alliteration,allenwood,alleging,allegiances,aligning,algerians,alerts,alchemist,alcerro,alastor,airway's,airmen,ahaha,ah'm,agitators,agitation,aforethought,afis,aesthetics,aerospace,aerodynamics,advertises,advert,advantageous,admonition,administration's,adirondacks,adenoids,adebisi's,acupuncturist,acula,actuarial,activators,actionable,acme's,acknowledges,achmed,achingly,acetate,accusers,accumulation,accorded,acclimated,acclimate,absurdly,absorbent,absolvo,absolutes,absences,abraham's,aboriginal,ablaze,abdomenizer,aaaaaaaaah,aaaaaaaaaa,a'right".split(","))),
        r("male_names",q("james,john,robert,michael,william,david,richard,charles,joseph,thomas,christopher,daniel,paul,mark,donald,george,kenneth,steven,edward,brian,ronald,anthony,kevin,jason,matthew,gary,timothy,jose,larry,jeffrey,frank,scott,eric,stephen,andrew,raymond,gregory,joshua,jerry,dennis,walter,patrick,peter,harold,douglas,henry,carl,arthur,ryan,roger,joe,juan,jack,albert,jonathan,justin,terry,gerald,keith,samuel,willie,ralph,lawrence,nicholas,roy,benjamin,bruce,brandon,adam,harry,fred,wayne,billy,steve,louis,jeremy,aaron,randy,eugene,carlos,russell,bobby,victor,ernest,phillip,todd,jesse,craig,alan,shawn,clarence,sean,philip,chris,johnny,earl,jimmy,antonio,danny,bryan,tony,luis,mike,stanley,leonard,nathan,dale,manuel,rodney,curtis,norman,marvin,vincent,glenn,jeffery,travis,jeff,chad,jacob,melvin,alfred,kyle,francis,bradley,jesus,herbert,frederick,ray,joel,edwin,don,eddie,ricky,troy,randall,barry,bernard,mario,leroy,francisco,marcus,micheal,theodore,clifford,miguel,oscar,jay,jim,tom,calvin,alex,jon,ronnie,bill,lloyd,tommy,leon,derek,darrell,jerome,floyd,leo,alvin,tim,wesley,dean,greg,jorge,dustin,pedro,derrick,dan,zachary,corey,herman,maurice,vernon,roberto,clyde,glen,hector,shane,ricardo,sam,rick,lester,brent,ramon,tyler,gilbert,gene,marc,reginald,ruben,brett,angel,nathaniel,rafael,edgar,milton,raul,ben,cecil,duane,andre,elmer,brad,gabriel,ron,roland,jared,adrian,karl,cory,claude,erik,darryl,neil,christian,javier,fernando,clinton,ted,mathew,tyrone,darren,lonnie,lance,cody,julio,kurt,allan,clayton,hugh,max,dwayne,dwight,armando,felix,jimmie,everett,ian,ken,bob,jaime,casey,alfredo,alberto,dave,ivan,johnnie,sidney,byron,julian,isaac,clifton,willard,daryl,virgil,andy,salvador,kirk,sergio,seth,kent,terrance,rene,eduardo,terrence,enrique,freddie,stuart,fredrick,arturo,alejandro,joey,nick,luther,wendell,jeremiah,evan,julius,donnie,otis,trevor,luke,homer,gerard,doug,kenny,hubert,angelo,shaun,lyle,matt,alfonso,orlando,rex,carlton,ernesto,pablo,lorenzo,omar,wilbur,blake,horace,roderick,kerry,abraham,rickey,ira,andres,cesar,johnathan,malcolm,rudolph,damon,kelvin,rudy,preston,alton,archie,marco,wm,pete,randolph,garry,geoffrey,jonathon,felipe,bennie,gerardo,ed,dominic,loren,delbert,colin,guillermo,earnest,benny,noel,rodolfo,myron,edmund,salvatore,cedric,lowell,gregg,sherman,devin,sylvester,roosevelt,israel,jermaine,forrest,wilbert,leland,simon,irving,owen,rufus,woodrow,kristopher,levi,marcos,gustavo,lionel,marty,gilberto,clint,nicolas,laurence,ismael,orville,drew,ervin,dewey,al,wilfred,josh,hugo,ignacio,caleb,tomas,sheldon,erick,frankie,darrel,rogelio,terence,alonzo,elias,bert,elbert,ramiro,conrad,noah,grady,phil,cornelius,lamar,rolando,clay,percy,dexter,bradford,merle,darin,amos,terrell,moses,irvin,saul,roman,darnell,randal,tommie,timmy,darrin,brendan,toby,van,abel,dominick,emilio,elijah,cary,domingo,aubrey,emmett,marlon,emanuel,jerald,edmond,emil,dewayne,otto,teddy,reynaldo,bret,jess,trent,humberto,emmanuel,stephan,louie,vicente,lamont,garland,micah,efrain,heath,rodger,demetrius,ethan,eldon,rocky,pierre,eli,bryce,antoine,robbie,kendall,royce,sterling,grover,elton,cleveland,dylan,chuck,damian,reuben,stan,leonardo,russel,erwin,benito,hans,monte,blaine,ernie,curt,quentin,agustin,jamal,devon,adolfo,tyson,wilfredo,bart,jarrod,vance,denis,damien,joaquin,harlan,desmond,elliot,darwin,gregorio,kermit,roscoe,esteban,anton,solomon,norbert,elvin,nolan,carey,rod,quinton,hal,brain,rob,elwood,kendrick,darius,moises,marlin,fidel,thaddeus,cliff,marcel,ali,raphael,bryon,armand,alvaro,jeffry,dane,joesph,thurman,ned,sammie,rusty,michel,monty,rory,fabian,reggie,kris,isaiah,gus,avery,loyd,diego,adolph,millard,rocco,gonzalo,derick,rodrigo,gerry,rigoberto,alphonso,ty,rickie,noe,vern,elvis,bernardo,mauricio,hiram,donovan,basil,nickolas,scot,vince,quincy,eddy,sebastian,federico,ulysses,heriberto,donnell,denny,gavin,emery,romeo,jayson,dion,dante,clement,coy,odell,jarvis,bruno,issac,dudley,sanford,colby,carmelo,nestor,hollis,stefan,donny,art,linwood,beau,weldon,galen,isidro,truman,delmar,johnathon,silas,frederic,irwin,merrill,charley,marcelino,carlo,trenton,kurtis,aurelio,winfred,vito,collin,denver,leonel,emory,pasquale,mohammad,mariano,danial,landon,dirk,branden,adan,numbers,clair,buford,german,bernie,wilmer,emerson,zachery,jacques,errol,josue,edwardo,wilford,theron,raymundo,daren,tristan,robby,lincoln,jame,genaro,octavio,cornell,hung,arron,antony,herschel,alva,giovanni,garth,cyrus,cyril,ronny,stevie,lon,kennith,carmine,augustine,erich,chadwick,wilburn,russ,myles,jonas,mitchel,mervin,zane,jamel,lazaro,alphonse,randell,major,johnie,jarrett,ariel,abdul,dusty,luciano,seymour,scottie,eugenio,mohammed,valentin,arnulfo,lucien,ferdinand,thad,ezra,aldo,rubin,royal,mitch,earle,abe,marquis,lanny,kareem,jamar,boris,isiah,emile,elmo,aron,leopoldo,everette,josef,eloy,dorian,rodrick,reinaldo,lucio,jerrod,weston,hershel,lemuel,lavern,burt,jules,gil,eliseo,ahmad,nigel,efren,antwan,alden,margarito,refugio,dino,osvaldo,les,deandre,normand,kieth,ivory,trey,norberto,napoleon,jerold,fritz,rosendo,milford,sang,deon,christoper,alfonzo,lyman,josiah,brant,wilton,rico,jamaal,dewitt,brenton,yong,olin,faustino,claudio,judson,gino,edgardo,alec,jarred,donn,trinidad,tad,porfirio,odis,lenard,chauncey,tod,mel,marcelo,kory,augustus,keven,hilario,bud,sal,orval,mauro,dannie,zachariah,olen,anibal,milo,jed,thanh,amado,lenny,tory,richie,horacio,brice,mohamed,delmer,dario,mac,jonah,jerrold,robt,hank,sung,rupert,rolland,kenton,damion,chi,antone,waldo,fredric,bradly,kip,burl,tyree,jefferey,ahmed,willy,stanford,oren,moshe,mikel,enoch,brendon,quintin,jamison,florencio,darrick,tobias,minh,hassan,giuseppe,demarcus,cletus,tyrell,lyndon,keenan,werner,theo,geraldo,columbus,chet,bertram,markus,huey,hilton,dwain,donte,tyron,omer,isaias,hipolito,fermin,chung,adalberto,jamey,teodoro,mckinley,maximo,sol,raleigh,lawerence,abram,rashad,emmitt,daron,chong,samual,otha,miquel,eusebio,dong,domenic,darron,wilber,renato,hoyt,haywood,ezekiel,chas,florentino,elroy,clemente,arden,neville,edison,deshawn,carrol,shayne,nathanial,jordon,danilo,claud,val,sherwood,raymon,rayford,cristobal,ambrose,titus,hyman,felton,ezequiel,erasmo,lonny,len,ike,milan,lino,jarod,herb,andreas,rhett,jude,douglass,cordell,oswaldo,ellsworth,virgilio,toney,nathanael,del,benedict,mose,hong,isreal,garret,fausto,asa,arlen,zack,modesto,francesco,manual,jae,gaylord,gaston,filiberto,deangelo,michale,granville,wes,malik,zackary,tuan,nicky,cristopher,antione,malcom,korey,jospeh,colton,waylon,von,hosea,shad,santo,rudolf,rolf,rey,renaldo,marcellus,lucius,kristofer,harland,arnoldo,rueben,leandro,kraig,jerrell,jeromy,hobert,cedrick,arlie,winford,wally,luigi,keneth,jacinto,graig,franklyn,edmundo,sid,leif,jeramy,willian,vincenzo,shon,michal,lynwood,jere,hai,elden,darell,broderick,alonso".split(","))),
        r("female_names",q("mary,patricia,linda,barbara,elizabeth,jennifer,maria,susan,margaret,dorothy,lisa,nancy,karen,betty,helen,sandra,donna,carol,ruth,sharon,michelle,laura,sarah,kimberly,deborah,jessica,shirley,cynthia,angela,melissa,brenda,amy,anna,rebecca,virginia,kathleen,pamela,martha,debra,amanda,stephanie,carolyn,christine,marie,janet,catherine,frances,ann,joyce,diane,alice,julie,heather,teresa,doris,gloria,evelyn,jean,cheryl,mildred,katherine,joan,ashley,judith,rose,janice,kelly,nicole,judy,christina,kathy,theresa,beverly,denise,tammy,irene,jane,lori,rachel,marilyn,andrea,kathryn,louise,sara,anne,jacqueline,wanda,bonnie,julia,ruby,lois,tina,phyllis,norma,paula,diana,annie,lillian,emily,robin,peggy,crystal,gladys,rita,dawn,connie,florence,tracy,edna,tiffany,carmen,rosa,cindy,grace,wendy,victoria,edith,kim,sherry,sylvia,josephine,thelma,shannon,sheila,ethel,ellen,elaine,marjorie,carrie,charlotte,monica,esther,pauline,emma,juanita,anita,rhonda,hazel,amber,eva,debbie,april,leslie,clara,lucille,jamie,joanne,eleanor,valerie,danielle,megan,alicia,suzanne,michele,gail,bertha,darlene,veronica,jill,erin,geraldine,lauren,cathy,joann,lorraine,lynn,sally,regina,erica,beatrice,dolores,bernice,audrey,yvonne,annette,june,marion,dana,stacy,ana,renee,ida,vivian,roberta,holly,brittany,melanie,loretta,yolanda,jeanette,laurie,katie,kristen,vanessa,alma,sue,elsie,beth,jeanne,vicki,carla,tara,rosemary,eileen,terri,gertrude,lucy,tonya,ella,stacey,wilma,gina,kristin,jessie,natalie,agnes,vera,charlene,bessie,delores,melinda,pearl,arlene,maureen,colleen,allison,tamara,joy,georgia,constance,lillie,claudia,jackie,marcia,tanya,nellie,minnie,marlene,heidi,glenda,lydia,viola,courtney,marian,stella,caroline,dora,jo,vickie,mattie,maxine,irma,mabel,marsha,myrtle,lena,christy,deanna,patsy,hilda,gwendolyn,jennie,nora,margie,nina,cassandra,leah,penny,kay,priscilla,naomi,carole,olga,billie,dianne,tracey,leona,jenny,felicia,sonia,miriam,velma,becky,bobbie,violet,kristina,toni,misty,mae,shelly,daisy,ramona,sherri,erika,katrina,claire,lindsey,lindsay,geneva,guadalupe,belinda,margarita,sheryl,cora,faye,ada,natasha,sabrina,isabel,marguerite,hattie,harriet,molly,cecilia,kristi,brandi,blanche,sandy,rosie,joanna,iris,eunice,angie,inez,lynda,madeline,amelia,alberta,genevieve,monique,jodi,janie,kayla,sonya,jan,kristine,candace,fannie,maryann,opal,alison,yvette,melody,luz,susie,olivia,flora,shelley,kristy,mamie,lula,lola,verna,beulah,antoinette,candice,juana,jeannette,pam,kelli,whitney,bridget,karla,celia,latoya,patty,shelia,gayle,della,vicky,lynne,sheri,marianne,kara,jacquelyn,erma,blanca,myra,leticia,pat,krista,roxanne,angelica,robyn,adrienne,rosalie,alexandra,brooke,bethany,sadie,bernadette,traci,jody,kendra,nichole,rachael,mable,ernestine,muriel,marcella,elena,krystal,angelina,nadine,kari,estelle,dianna,paulette,lora,mona,doreen,rosemarie,desiree,antonia,janis,betsy,christie,freda,meredith,lynette,teri,cristina,eula,leigh,meghan,sophia,eloise,rochelle,gretchen,cecelia,raquel,henrietta,alyssa,jana,gwen,jenna,tricia,laverne,olive,tasha,silvia,elvira,delia,kate,patti,lorena,kellie,sonja,lila,lana,darla,mindy,essie,mandy,lorene,elsa,josefina,jeannie,miranda,dixie,lucia,marta,faith,lela,johanna,shari,camille,tami,shawna,elisa,ebony,melba,ora,nettie,tabitha,ollie,winifred,kristie,marina,alisha,aimee,rena,myrna,marla,tammie,latasha,bonita,patrice,ronda,sherrie,addie,francine,deloris,stacie,adriana,cheri,abigail,celeste,jewel,cara,adele,rebekah,lucinda,dorthy,effie,trina,reba,sallie,aurora,lenora,etta,lottie,kerri,trisha,nikki,estella,francisca,josie,tracie,marissa,karin,brittney,janelle,lourdes,laurel,helene,fern,elva,corinne,kelsey,ina,bettie,elisabeth,aida,caitlin,ingrid,iva,eugenia,christa,goldie,maude,jenifer,therese,dena,lorna,janette,latonya,candy,consuelo,tamika,rosetta,debora,cherie,polly,dina,jewell,fay,jillian,dorothea,nell,trudy,esperanza,patrica,kimberley,shanna,helena,cleo,stefanie,rosario,ola,janine,mollie,lupe,alisa,lou,maribel,susanne,bette,susana,elise,cecile,isabelle,lesley,jocelyn,paige,joni,rachelle,leola,daphne,alta,ester,petra,graciela,imogene,jolene,keisha,lacey,glenna,gabriela,keri,ursula,lizzie,kirsten,shana,adeline,mayra,jayne,jaclyn,gracie,sondra,carmela,marisa,rosalind,charity,tonia,beatriz,marisol,clarice,jeanine,sheena,angeline,frieda,lily,shauna,millie,claudette,cathleen,angelia,gabrielle,autumn,katharine,jodie,staci,lea,christi,justine,elma,luella,margret,dominique,socorro,martina,margo,mavis,callie,bobbi,maritza,lucile,leanne,jeannine,deana,aileen,lorie,ladonna,willa,manuela,gale,selma,dolly,sybil,abby,ivy,dee,winnie,marcy,luisa,jeri,magdalena,ofelia,meagan,audra,matilda,leila,cornelia,bianca,simone,bettye,randi,virgie,latisha,barbra,georgina,eliza,leann,bridgette,rhoda,haley,adela,nola,bernadine,flossie,ila,greta,ruthie,nelda,minerva,lilly,terrie,letha,hilary,estela,valarie,brianna,rosalyn,earline,catalina,ava,mia,clarissa,lidia,corrine,alexandria,concepcion,tia,sharron,rae,dona,ericka,jami,elnora,chandra,lenore,neva,marylou,melisa,tabatha,serena,avis,allie,sofia,jeanie,odessa,nannie,harriett,loraine,penelope,milagros,emilia,benita,allyson,ashlee,tania,esmeralda,karina,eve,pearlie,zelma,malinda,noreen,tameka,saundra,hillary,amie,althea,rosalinda,lilia,alana,clare,alejandra,elinor,lorrie,jerri,darcy,earnestine,carmella,noemi,marcie,liza,annabelle,louisa,earlene,mallory,carlene,nita,selena,tanisha,katy,julianne,lakisha,edwina,maricela,margery,kenya,dollie,roxie,roslyn,kathrine,nanette,charmaine,lavonne,ilene,tammi,suzette,corine,kaye,chrystal,lina,deanne,lilian,juliana,aline,luann,kasey,maryanne,evangeline,colette,melva,lawanda,yesenia,nadia,madge,kathie,ophelia,valeria,nona,mitzi,mari,georgette,claudine,fran,alissa,roseann,lakeisha,susanna,reva,deidre,chasity,sheree,elvia,alyce,deirdre,gena,briana,araceli,katelyn,rosanne,wendi,tessa,berta,marva,imelda,marietta,marci,leonor,arline,sasha,madelyn,janna,juliette,deena,aurelia,josefa,augusta,liliana,lessie,amalia,savannah,anastasia,vilma,natalia,rosella,lynnette,corina,alfreda,leanna,amparo,coleen,tamra,aisha,wilda,karyn,queen,maura,mai,evangelina,rosanna,hallie,erna,enid,mariana,lacy,juliet,jacklyn,freida,madeleine,mara,cathryn,lelia,casandra,bridgett,angelita,jannie,dionne,annmarie,katina,beryl,millicent,katheryn,diann,carissa,maryellen,liz,lauri,helga,gilda,rhea,marquita,hollie,tisha,tamera,angelique,francesca,kaitlin,lolita,florine,rowena,reyna,twila,fanny,janell,ines,concetta,bertie,alba,brigitte,alyson,vonda,pansy,elba,noelle,letitia,deann,brandie,louella,leta,felecia,sharlene,lesa,beverley,isabella,herminia,terra,celina,tori,octavia,jade,denice,germaine,michell,cortney,nelly,doretha,deidra,monika,lashonda,judi,chelsey,antionette,margot,adelaide,nan,leeann,elisha,dessie,libby,kathi,gayla,latanya,mina,mellisa,kimberlee,jasmin,renae,zelda,elda,justina,gussie,emilie,camilla,abbie,rocio,kaitlyn,edythe,ashleigh,selina,lakesha,geri,allene,pamala,michaela,dayna,caryn,rosalia,sun,jacquline,rebeca,marybeth,krystle,iola,dottie,belle,griselda,ernestina,elida,adrianne,demetria,delma,jaqueline,arleen,virgina,retha,fatima,tillie,eleanore,cari,treva,wilhelmina,rosalee,maurine,latrice,jena,taryn,elia,debby,maudie,jeanna,delilah,catrina,shonda,hortencia,theodora,teresita,robbin,danette,delphine,brianne,nilda,danna,cindi,bess,iona,winona,vida,rosita,marianna,racheal,guillermina,eloisa,celestine,caren,malissa,lona,chantel,shellie,marisela,leora,agatha,soledad,migdalia,ivette,christen,janel,veda,pattie,tessie,tera,marilynn,lucretia,karrie,dinah,daniela,alecia,adelina,vernice,shiela,portia,merry,lashawn,dara,tawana,oma,verda,alene,zella,sandi,rafaela,maya,kira,candida,alvina,suzan,shayla,lyn,lettie,samatha,oralia,matilde,larissa,vesta,renita,india,delois,shanda,phillis,lorri,erlinda,cathrine,barb,zoe,isabell,ione,gisela,roxanna,mayme,kisha,ellie,mellissa,dorris,dalia,bella,annetta,zoila,reta,reina,lauretta,kylie,christal,pilar,charla,elissa,tiffani,tana,paulina,leota,breanna,jayme,carmel,vernell,tomasa,mandi,dominga,santa,melodie,lura,alexa,tamela,mirna,kerrie,venus,felicita,cristy,carmelita,berniece,annemarie,tiara,roseanne,missy,cori,roxana,pricilla,kristal,jung,elyse,haydee,aletha,bettina,marge,gillian,filomena,zenaida,harriette,caridad,vada,una,aretha,pearline,marjory,marcela,flor,evette,elouise,alina,damaris,catharine,belva,nakia,marlena,luanne,lorine,karon,dorene,danita,brenna,tatiana,louann,julianna,andria,philomena,lucila,leonora,dovie,romona,mimi,jacquelin,gaye,tonja,misti,chastity,stacia,roxann,micaela,nikita,mei,velda,marlys,johnna,aura,ivonne,hayley,nicki,majorie,herlinda,yadira,perla,gregoria,antonette,shelli,mozelle,mariah,joelle,cordelia,josette,chiquita,trista,laquita,georgiana,candi,shanon,hildegard,valentina,stephany,magda,karol,gabriella,tiana,roma,richelle,oleta,jacque,idella,alaina,suzanna,jovita,tosha,nereida,marlyn,kyla,delfina,tena,stephenie,sabina,nathalie,marcelle,gertie,darleen,thea,sharonda,shantel,belen,venessa,rosalina,ona,genoveva,clementine,rosalba,renate,renata,georgianna,floy,dorcas,ariana,tyra,theda,mariam,juli,jesica,vikki,verla,roselyn,melvina,jannette,ginny,debrah,corrie,asia,violeta,myrtis,latricia,collette,charleen,anissa,viviana,twyla,nedra,latonia,lan,hellen,fabiola,annamarie,adell,sharyn,chantal,niki,maud,lizette,lindy,kia,kesha,jeana,danelle,charline,chanel,valorie,lia,dortha,cristal,leone,leilani,gerri,debi,andra,keshia,ima,eulalia,easter,dulce,natividad,linnie,kami,georgie,catina,brook,alda,winnifred,sharla,ruthann,meaghan,magdalene,lissette,adelaida,venita,trena,shirlene,shameka,elizebeth,dian,shanta,latosha,carlotta,windy,rosina,mariann,leisa,jonnie,dawna,cathie,astrid,laureen,janeen,holli,fawn,vickey,teressa,shante,rubye,marcelina,chanda,terese,scarlett,marnie,lulu,lisette,jeniffer,elenor,dorinda,donita,carman,bernita,altagracia,aleta,adrianna,zoraida,nicola,lyndsey,janina,ami,starla,phylis,phuong,kyra,charisse,blanch,sanjuanita,rona,nanci,marilee,maranda,brigette,sanjuana,marita,kassandra,joycelyn,felipa,chelsie,bonny,mireya,lorenza,kyong,ileana,candelaria,sherie,lucie,leatrice,lakeshia,gerda,edie,bambi,marylin,lavon,hortense,garnet,evie,tressa,shayna,lavina,kyung,jeanetta,sherrill,shara,phyliss,mittie,anabel,alesia,thuy,tawanda,joanie,tiffanie,lashanda,karissa,enriqueta,daria,daniella,corinna,alanna,abbey,roxane,roseanna,magnolia,lida,joellen,era,coral,carleen,tresa,peggie,novella,nila,maybelle,jenelle,carina,nova,melina,marquerite,margarette,josephina,evonne,cinthia,albina,toya,tawnya,sherita,myriam,lizabeth,lise,keely,jenni,giselle,cheryle,ardith,ardis,alesha,adriane,shaina,linnea,karolyn,felisha,dori,darci,artie,armida,zola,xiomara,vergie,shamika,nena,nannette,maxie,lovie,jeane,jaimie,inge,farrah,elaina,caitlyn,felicitas,cherly,caryl,yolonda,yasmin,teena,prudence,pennie,nydia,mackenzie,orpha,marvel,lizbeth,laurette,jerrie,hermelinda,carolee,tierra,mirian,meta,melony,kori,jennette,jamila,ena,anh,yoshiko,susannah,salina,rhiannon,joleen,cristine,ashton,aracely,tomeka,shalonda,marti,lacie,kala,jada,ilse,hailey,brittani,zona,syble,sherryl,nidia,marlo,kandice,kandi,deb,alycia,ronna,norene,mercy,ingeborg,giovanna,gemma,christel,audry,zora,vita,trish,stephaine,shirlee,shanika,melonie,mazie,jazmin,inga,hoa,hettie,geralyn,fonda,estrella,adella,sarita,rina,milissa,maribeth,golda,evon,ethelyn,enedina,cherise,chana,velva,tawanna,sade,mirta,karie,jacinta,elna,davina,cierra,ashlie,albertha,tanesha,nelle,mindi,lorinda,larue,florene,demetra,dedra,ciara,chantelle,ashly,suzy,rosalva,noelia,lyda,leatha,krystyna,kristan,karri,darline,darcie,cinda,cherrie,awilda,almeda,rolanda,lanette,jerilyn,gisele,evalyn,cyndi,cleta,carin,zina,zena,velia,tanika,charissa,talia,margarete,lavonda,kaylee,kathlene,jonna,irena,ilona,idalia,candis,candance,brandee,anitra,alida,sigrid,nicolette,maryjo,linette,hedwig,christiana,alexia,tressie,modesta,lupita,lita,gladis,evelia,davida,cherri,cecily,ashely,annabel,agustina,wanita,shirly,rosaura,hulda,eun,yetta,verona,thomasina,sibyl,shannan,mechelle,lue,leandra,lani,kylee,kandy,jolynn,ferne,eboni,corene,alysia,zula,nada,moira,lyndsay,lorretta,jammie,hortensia,gaynell,adria,vina,vicenta,tangela,stephine,norine,nella,liana,leslee,kimberely,iliana,glory,felica,emogene,elfriede,eden,eartha,carma,bea,ocie,lennie,kiara,jacalyn,carlota,arielle,otilia,kirstin,kacey,johnetta,joetta,jeraldine,jaunita,elana,dorthea,cami,amada,adelia,vernita,tamar,siobhan,renea,rashida,ouida,nilsa,meryl,kristyn,julieta,danica,breanne,aurea,anglea,sherron,odette,malia,lorelei,leesa,kenna,kathlyn,fiona,charlette,suzie,shantell,sabra,racquel,myong,mira,martine,lucienne,lavada,juliann,elvera,delphia,christiane,charolette,carri,asha,angella,paola,ninfa,leda,lai,eda,stefani,shanell,palma,machelle,lissa,kecia,kathryne,karlene,julissa,jettie,jenniffer,hui,corrina,carolann,alena,rosaria,myrtice,marylee,liane,kenyatta,judie,janey,elmira,eldora,denna,cristi,cathi,zaida,vonnie,viva,vernie,rosaline,mariela,luciana,lesli,karan,felice,deneen,adina,wynona,tarsha,sheron,shanita,shani,shandra,randa,pinkie,nelida,marilou,lyla,laurene,laci,joi,janene,dorotha,daniele,dani,carolynn,carlyn,berenice,ayesha,anneliese,alethea,thersa,tamiko,rufina,oliva,mozell,marylyn,kristian,kathyrn,kasandra,kandace,janae,domenica,debbra,dannielle,arcelia,aja,zenobia,sharen,sharee,lavinia,kum,kacie,jackeline,huong,felisa,emelia,eleanora,cythia,cristin,claribel,anastacia,zulma,zandra,yoko,tenisha,susann,sherilyn,shay,shawanda,romana,mathilda,linsey,keiko,joana,isela,gretta,georgetta,eugenie,desirae,delora,corazon,antonina,anika,willene,tracee,tamatha,nichelle,mickie,maegan,luana,lanita,kelsie,edelmira,bree,afton,teodora,tamie,shena,meg,linh,keli,kaci,danyelle,arlette,albertine,adelle,tiffiny,simona,nicolasa,nichol,nia,nakisha,mee,maira,loreen,kizzy,fallon,christene,bobbye,vincenza,tanja,rubie,roni,queenie,margarett,kimberli,irmgard,idell,hilma,evelina,esta,emilee,dennise,dania,carie,wai,risa,rikki,particia,mui,masako,luvenia,loree,loni,lien,gigi,florencia,denita,billye,tomika,sharita,rana,nikole,neoma,margarite,madalyn,lucina,laila,kali,jenette,gabriele,evelyne,elenora,clementina,alejandrina,zulema,violette,vannessa,thresa,retta,pia,patience,noella,nickie,jonell,chaya,camelia,bethel,anya,suzann,shu,mila,lilla,laverna,keesha,kattie,georgene,eveline,estell,elizbeth,vivienne,vallie,trudie,stephane,magaly,madie,kenyetta,karren,janetta,hermine,drucilla,debbi,celestina,candie,britni,beckie,amina,zita,yun,yolande,vivien,vernetta,trudi,sommer,pearle,patrina,ossie,nicolle,loyce,letty,larisa,katharina,joselyn,jonelle,jenell,iesha,heide,florinda,florentina,flo,elodia,dorine,brunilda,brigid,ashli,ardella,twana,thu,tarah,shavon,serina,rayna,ramonita,nga,margurite,lucrecia,kourtney,kati,jesenia,crista,ayana,alica,alia,vinnie,suellen,romelia,rachell,olympia,michiko,kathaleen,jolie,jessi,janessa,hana,elease,carletta,britany,shona,salome,rosamond,regena,raina,ngoc,nelia,louvenia,lesia,latrina,laticia,larhonda,jina,jacki,emmy,deeann,coretta,arnetta,thalia,shanice,neta,mikki,micki,lonna,leana,lashunda,kiley,joye,jacqulyn,ignacia,hyun,hiroko,henriette,elayne,delinda,dahlia,coreen,consuela,conchita,celine,babette,ayanna,anette,albertina,shawnee,shaneka,quiana,pamelia,min,merri,merlene,margit,kiesha,kiera,kaylene,jodee,jenise,erlene,emmie,dalila,daisey,casie,belia,babara,versie,vanesa,shelba,shawnda,nikia,naoma,marna,margeret,madaline,lawana,kindra,jutta,jazmine,janett,hannelore,glendora,gertrud,garnett,freeda,frederica,florance,flavia,carline,beverlee,anjanette,valda,tamala,shonna,sha,sarina,oneida,merilyn,marleen,lurline,lenna,katherin,jin,jeni,hae,gracia,glady,farah,enola,ema,dominque,devona,delana,cecila,caprice,alysha,alethia,vena,theresia,tawny,shakira,samara,sachiko,rachele,pamella,marni,mariel,maren,malisa,ligia,lera,latoria,larae,kimber,kathern,karey,jennefer,janeth,halina,fredia,delisa,debroah,ciera,angelika,andree,altha,yen,vivan,terresa,tanna,suk,sudie,soo,signe,salena,ronni,rebbecca,myrtie,malika,maida,loan,leonarda,kayleigh,ethyl,ellyn,dayle,cammie,brittni,birgit,avelina,asuncion,arianna,akiko,venice,tyesha,tonie,tiesha,takisha,steffanie,sindy,meghann,manda,macie,kellye,kellee,joslyn,inger,indira,glinda,glennis,fernanda,faustina,eneida,elicia,dot,digna,dell,arletta,willia,tammara,tabetha,sherrell,sari,rebbeca,pauletta,natosha,nakita,mammie,kenisha,kazuko,kassie,earlean,daphine,corliss,clotilde,carolyne,bernetta,augustina,audrea,annis,annabell,yan,tennille,tamica,selene,rosana,regenia,qiana,markita,macy,leeanne,laurine,kym,jessenia,janita,georgine,genie,emiko,elvie,deandra,dagmar,corie,collen,cherish,romaine,porsha,pearlene,micheline,merna,margorie,margaretta,lore,jenine,hermina,fredericka,elke,drusilla,dorathy,dione,celena,brigida,angeles,allegra,tamekia,synthia,sook,slyvia,rosann,reatha,raye,marquetta,margart,layla,kymberly,kiana,kayleen,katlyn,karmen,joella,irina,emelda,eleni,detra,clemmie,cheryll,chantell,cathey,arnita,arla,angle,angelic,alyse,zofia,thomasine,tennie,sherly,sherley,sharyl,remedios,petrina,nickole,myung,myrle,mozella,louanne,lisha,latia,krysta,julienne,jeanene,jacqualine,isaura,gwenda,earleen,cleopatra,carlie,audie,antonietta,alise,verdell,tomoko,thao,talisha,shemika,savanna,santina,rosia,raeann,odilia,nana,minna,magan,lynelle,karma,joeann,ivana,inell,ilana,hye,hee,gudrun,dreama,crissy,chante,carmelina,arvilla,annamae,alvera,aleida,yanira,vanda,tianna,tam,stefania,shira,nicol,nancie,monserrate,melynda,melany,lovella,laure,kacy,jacquelynn,hyon,gertha,eliana,christena,christeen,charise,caterina,carley,candyce,arlena,ammie,willette,vanita,tuyet,syreeta,penney,nyla,maryam,marya,magen,ludie,loma,livia,lanell,kimberlie,julee,donetta,diedra,denisha,deane,dawne,clarine,cherryl,bronwyn,alla,valery,tonda,sueann,soraya,shoshana,shela,sharleen,shanelle,nerissa,meridith,mellie,maye,maple,magaret,lili,leonila,leonie,leeanna,lavonia,lavera,kristel,kathey,kathe,jann,ilda,hildred,hildegarde,genia,fumiko,evelin,ermelinda,elly,dung,doloris,dionna,danae,berneice,annice,alix,verena,verdie,shawnna,shawana,shaunna,rozella,randee,ranae,milagro,lynell,luise,loida,lisbeth,karleen,junita,jona,isis,hyacinth,hedy,gwenn,ethelene,erline,donya,domonique,delicia,dannette,cicely,branda,blythe,bethann,ashlyn,annalee,alline,yuko,vella,trang,towanda,tesha,sherlyn,narcisa,miguelina,meri,maybell,marlana,marguerita,madlyn,lory,loriann,leonore,leighann,laurice,latesha,laronda,katrice,kasie,kaley,jadwiga,glennie,gearldine,francina,epifania,dyan,dorie,diedre,denese,demetrice,delena,cristie,cleora,catarina,carisa,barbera,almeta,trula,tereasa,solange,sheilah,shavonne,sanora,rochell,mathilde,margareta,maia,lynsey,lawanna,launa,kena,keena,katia,glynda,gaylene,elvina,elanor,danuta,danika,cristen,cordie,coletta,clarita,carmon,brynn,azucena,aundrea,angele,verlie,verlene,tamesha,silvana,sebrina,samira,reda,raylene,penni,norah,noma,mireille,melissia,maryalice,laraine,kimbery,karyl,karine,kam,jolanda,johana,jesusa,jaleesa,jacquelyne,iluminada,hilaria,hanh,gennie,francie,floretta,exie,edda,drema,delpha,bev,barbar,assunta,ardell,annalisa,alisia,yukiko,yolando,wonda,wei,waltraud,veta,temeka,tameika,shirleen,shenita,piedad,ozella,mirtha,marilu,kimiko,juliane,jenice,janay,jacquiline,hilde,fae,elois,echo,devorah,chau,brinda,betsey,arminda,aracelis,apryl,annett,alishia,veola,usha,toshiko,theola,tashia,talitha,shery,renetta,reiko,rasheeda,obdulia,mika,melaine,meggan,marlen,marget,marceline,mana,magdalen,librada,lezlie,latashia,lasandra,kelle,isidra,isa,inocencia,gwyn,francoise,erminia,erinn,dimple,devora,criselda,armanda,arie,ariane,angelena,aliza,adriene,adaline,xochitl,twanna,tomiko,tamisha,taisha,susy,siu,rutha,rhona,noriko,natashia,merrie,marinda,mariko,margert,loris,lizzette,leisha,kaila,joannie,jerrica,jene,jannet,janee,jacinda,herta,elenore,doretta,delaine,daniell,claudie,britta,apolonia,amberly,alease,yuri,yuk,wen,waneta,ute,tomi,sharri,sandie,roselle,reynalda,raguel,phylicia,patria,olimpia,odelia,mitzie,minda,mignon,mica,mendy,marivel,maile,lynetta,lavette,lauryn,latrisha,lakiesha,kiersten,kary,josphine,jolyn,jetta,janise,jacquie,ivelisse,glynis,gianna,gaynelle,danyell,danille,dacia,coralee,cher,ceola,arianne,aleshia,yung,williemae,trinh,thora,tai,svetlana,sherika,shemeka,shaunda,roseline,ricki,melda,mallie,lavonna,latina,laquanda,lala,lachelle,klara,kandis,johna,jeanmarie,jaye,grayce,gertude,emerita,ebonie,clorinda,ching,chery,carola,breann,blossom,bernardine,becki,arletha,argelia,ara,alita,yulanda,yon,yessenia,tobi,tasia,sylvie,shirl,shirely,shella,shantelle,sacha,rebecka,providencia,paulene,misha,miki,marline,marica,lorita,latoyia,lasonya,kerstin,kenda,keitha,kathrin,jaymie,gricelda,ginette,eryn,elina,elfrieda,danyel,cheree,chanelle,barrie,aurore,annamaria,alleen,ailene,aide,yasmine,vashti,treasa,tiffaney,sheryll,sharie,shanae,sau,raisa,neda,mitsuko,mirella,milda,maryanna,maragret,mabelle,luetta,lorina,letisha,latarsha,lanelle,lajuana,krissy,karly,karena,jessika,jerica,jeanelle,jalisa,jacelyn,izola,euna,etha,domitila,dominica,daina,creola,carli,camie,brittny,ashanti,anisha,aleen,adah,yasuko,valrie,tona,tinisha,thi,terisa,taneka,simonne,shalanda,serita,ressie,refugia,olene,margherita,mandie,maire,lyndia,luci,lorriane,loreta,leonia,lavona,lashawnda,lakia,kyoko,krystina,krysten,kenia,kelsi,jeanice,isobel,georgiann,genny,felicidad,eilene,deloise,conception,clora,cherilyn,calandra,armandina,anisa,ula,tiera,theressa,stephania,sima,shyla,shonta,shera,shaquita,shala,rossana,nohemi,nery,moriah,melita,melida,melani,marylynn,marisha,mariette,malorie,madelene,ludivina,loria,lorette,loralee,lianne,lavenia,laurinda,lashon,kit,kimi,keila,katelynn,kai,jone,joane,jayna,janella,hue,hertha,francene,elinore,despina,delsie,deedra,clemencia,carolin,bulah,brittanie,bok,blondell,bibi,beaulah,beata,annita,agripina,virgen,valene,twanda,tommye,toi,tarra,tari,tammera,shakia,sadye,ruthanne,rochel,rivka,pura,nenita,natisha,merrilee,melodee,marvis,lucilla,leena,laveta,larita,lanie,keren,ileen,georgeann,genna,frida,ewa,eufemia,emely,ela,edyth,deonna,deadra,darlena,chanell,cathern,cassondra,cassaundra,bernarda,berna,arlinda,anamaria,vertie,valeri,torri,tatyana,stasia,sherise,sherill,sanda,ruthe,rosy,robbi,ranee,quyen,pearly,palmira,onita,nisha,niesha,nida,nam,merlyn,mayola,marylouise,marth,margene,madelaine,londa,leontine,leoma,leia,lauralee,lanora,lakita,kiyoko,keturah,katelin,kareen,jonie,johnette,jenee,jeanett,izetta,hiedi,heike,hassie,giuseppina,georgann,fidela,fernande,elwanda,ellamae,eliz,dusti,dotty,cyndy,coralie,celesta,argentina,alverta,xenia,wava,vanetta,torrie,tashina,tandy,tambra,tama,stepanie,shila,shaunta,sharan,shaniqua,shae,setsuko,serafina,sandee,rosamaria,priscila,olinda,nadene,muoi,michelina,mercedez,maryrose,marcene,mao,magali,mafalda,lannie,kayce,karoline,kamilah,kamala,justa,joline,jennine,jacquetta,iraida,georgeanna,franchesca,emeline,elane,ehtel,earlie,dulcie,dalene,classie,chere,charis,caroyln,carmina,carita,bethanie,ayako,arica,alysa,alessandra,akilah,adrien,zetta,youlanda,yelena,yahaira,wendolyn,tijuana,terina,teresia,suzi,sherell,shavonda,shaunte,sharda,shakita,sena,ryann,rubi,riva,reginia,rachal,parthenia,pamula,monnie,monet,michaele,melia,malka,maisha,lisandra,lekisha,lean,lakendra,krystin,kortney,kizzie,kittie,kera,kendal,kemberly,kanisha,julene,jule,johanne,jamee,halley,gidget,galina,fredricka,fleta,fatimah,eusebia,elza,eleonore,dorthey,doria,donella,dinorah,delorse,claretha,christinia,charlyn,bong,belkis,azzie,andera,aiko,adena,yer,yajaira,wan,vania,ulrike,toshia,tifany,stefany,shizue,shenika,shawanna,sharolyn,sharilyn,shaquana,shantay,rozanne,roselee,remona,reanna,raelene,phung,petronila,natacha,nancey,myrl,miyoko,miesha,merideth,marvella,marquitta,marhta,marchelle,lizeth,libbie,lahoma,ladawn,kina,katheleen,katharyn,karisa,kaleigh,junie,julieann,johnsie,janean,jaimee,jackqueline,hisako,herma,helaine,gwyneth,gita,eustolia,emelina,elin,edris,donnette,donnetta,dierdre,denae,darcel,clarisa,cinderella,chia,charlesetta,charita,celsa,cassy,cassi,carlee,bruna,brittaney,brande,billi,bao,antonetta,angla,angelyn,analisa,alane,wenona,wendie,veronique,vannesa,tobie,tempie,sumiko,sulema,sparkle,somer,sheba,sharice,shanel,shalon,rosio,roselia,renay,rema,reena,ozie,oretha,oralee,oda,ngan,nakesha,milly,marybelle,margrett,maragaret,manie,lurlene,lillia,lieselotte,lavelle,lashaunda,lakeesha,kaycee,kalyn,joya,joette,jenae,janiece,illa,grisel,glayds,genevie,gala,fredda,eleonor,debera,deandrea,corrinne,cordia,contessa,colene,cleotilde,chantay,cecille,beatris,azalee,arlean,ardath,anjelica,anja,alfredia,aleisha,zada,yuonne,willodean,vennie,vanna,tyisha,tova,torie,tonisha,tilda,tien,sirena,sherril,shanti,senaida,samella,robbyn,renda,reita,phebe,paulita,nobuko,nguyet,neomi,mikaela,melania,maximina,marg,maisie,lynna,lilli,lashaun,lakenya,lael,kirstie,kathline,kasha,karlyn,karima,jovan,josefine,jennell,jacqui,jackelyn,hyo,hien,grazyna,florrie,floria,eleonora,dwana,dorla,delmy,deja,dede,dann,crysta,clelia,claris,chieko,cherlyn,cherelle,charmain,chara,cammy,bee,arnette,ardelle,annika,amiee,amee,allena,yvone,yuki,yoshie,yevette,yael,willetta,voncile,venetta,tula,tonette,timika,temika,telma,teisha,taren,stacee,shawnta,saturnina,ricarda,pok,pasty,onie,nubia,marielle,mariella,marianela,mardell,luanna,loise,lisabeth,lindsy,lilliana,lilliam,lelah,leigha,leanora,kristeen,khalilah,keeley,kandra,junko,joaquina,jerlene,jani,jamika,hsiu,hermila,genevive,evia,eugena,emmaline,elfreda,elene,donette,delcie,deeanna,darcey,cuc,clarinda,cira,chae,celinda,catheryn,casimira,carmelia,camellia,breana,bobette,bernardina,bebe,basilia,arlyne,amal,alayna,zonia,zenia,yuriko,yaeko,wynell,willena,vernia,tora,terrilyn,terica,tenesha,tawna,tajuana,taina,stephnie,sona,sina,shondra,shizuko,sherlene,sherice,sharika,rossie,rosena,rima,ria,rheba,renna,natalya,nancee,melodi,meda,matha,marketta,maricruz,marcelene,malvina,luba,louetta,leida,lecia,lauran,lashawna,laine,khadijah,katerine,kasi,kallie,julietta,jesusita,jestine,jessia,jeffie,janyce,isadora,georgianne,fidelia,evita,eura,eulah,estefana,elsy,eladia,dodie,dia,denisse,deloras,delila,daysi,crystle,concha,claretta,charlsie,charlena,carylon,bettyann,asley,ashlea,amira,agueda,agnus,yuette,vinita,victorina,tynisha,treena,toccara,tish,thomasena,tegan,soila,shenna,sharmaine,shantae,shandi,september,saran,sarai,sana,rosette,rolande,regine,otelia,olevia,nicholle,necole,naida,myrta,myesha,mitsue,minta,mertie,margy,mahalia,madalene,loura,lorean,lesha,leonida,lenita,lavone,lashell,lashandra,lamonica,kimbra,katherina,karry,kanesha,jong,jeneva,jaquelyn,hwa,gilma,ghislaine,gertrudis,fransisca,fermina,ettie,etsuko,ellan,elidia,edra,dorethea,doreatha,denyse,deetta,daine,cyrstal,corrin,cayla,carlita,camila,burma,bula,buena,barabara,avril,alaine,zana,wilhemina,wanetta,veronika,verline,vasiliki,tonita,tisa,teofila,tayna,taunya,tandra,takako,sunni,suanne,sixta,sharell,seema,rosenda,robena,raymonde,pei,pamila,ozell,neida,mistie,micha,merissa,maurita,maryln,maryetta,marcell,malena,makeda,lovetta,lourie,lorrine,lorilee,laurena,lashay,larraine,laree,lacresha,kristle,krishna,keva,keira,karole,joie,jinny,jeannetta,jama,heidy,gilberte,gema,faviola,evelynn,enda,elli,ellena,divina,dagny,collene,codi,cindie,chassidy,chasidy,catrice,catherina,cassey,caroll,carlena,candra,calista,bryanna,britteny,beula,bari,audrie,audria,ardelia,annelle,angila,alona,allyn".split(","))),
    ra=v.concat([function(b){var a,d,c,e,f,g,h,i,j,k,l,m,o,n,p,q;f=[];p=P(R(b));j=0;for(m=p.length;j<m;j++){g=p[j];if(O(g))break;k=0;for(o=v.length;k<o;k++){c=v[k];e=U(b,g);q=c(e);l=0;for(n=q.length;l<n;l++)if(c=q[l],i=b.slice(c.i,+c.j+1||9E9),i.toLowerCase()!==c.matched_word){e={};for(h in g)a=g[h],-1!==i.indexOf(h)&&(e[h]=a);c.l33t=!0;c.token=i;c.sub=e;i=c;var B=void 0,B=[];for(d in e)a=e[d],B.push(""+d+" -> "+a);i.sub_display=B.join(", ");f.push(c)}}}return f},function(b){var a,d,c,e,f,g;f=p(b,N);
        g=[];c=0;for(e=f.length;c<e;c++)a=f[c],d=[a.i,a.j],a=d[0],d=d[1],g.push({pattern:"digits",i:a,j:d,token:b.slice(a,+d+1||9E9)});return g},function(b){var a,d,c,e,f,g;f=p(b,V);g=[];c=0;for(e=f.length;c<e;c++)a=f[c],d=[a.i,a.j],a=d[0],d=d[1],g.push({pattern:"year",i:a,j:d,token:b.slice(a,+d+1||9E9)});return g},function(b){return L(b).concat(K(b))},function(b){var a,d,c;c=[];for(a=0;a<b.length;){for(d=a+1;;)if(b.slice(d-1,+d+1||9E9),b.charAt(d-1)===b.charAt(d))d+=1;else{2<d-a&&c.push({pattern:"repeat",
        i:a,j:d-1,token:b.slice(a,d),repeated_char:b.charAt(a)});break}a=d}return c},function(b){var a,d,c,e,f,g,h,i,j,k,l,m,n;i=[];for(f=0;f<b.length;){g=f+1;m=n=j=null;for(l in x)if(k=x[l],c=function(){var c,d,e,h;e=[b.charAt(f),b.charAt(g)];h=[];c=0;for(d=e.length;c<d;c++)a=e[c],h.push(k.indexOf(a));return h}(),e=c[0],c=c[1],-1<e&&-1<c&&(e=c-e,1===e||-1===e)){j=k;n=l;m=e;break}if(j)for(;;)if(e=b.slice(g-1,+g+1||9E9),h=e[0],d=e[1],c=function(){var b,c,e,f;e=[h,d];f=[];b=0;for(c=e.length;b<c;b++)a=e[b],
            f.push(k.indexOf(a));return f}(),e=c[0],c=c[1],c-e===m)g+=1;else{2<g-f&&i.push({pattern:"sequence",i:f,j:g-1,token:b.slice(f,g),sequence_name:n,sequence_space:j.length,ascending:1===m});break}f=g}return i},function(b){var a,d,c;c=[];for(d in G)a=G[d],z(c,T(b,a,d));return c}]);G={qwerty:E,dvorak:{"!":["`~",null,null,"2@","'\"",null],'"':[null,"1!","2@",",<","aA",null],"#":["2@",null,null,"4$",".>",",<"],$:["3#",null,null,"5%","pP",".>"],"%":["4$",null,null,"6^","yY","pP"],"&":["6^",null,null,"8*",
        "gG","fF"],"'":[null,"1!","2@",",<","aA",null],"(":["8*",null,null,"0)","rR","cC"],")":["9(",null,null,"[{","lL","rR"],"*":["7&",null,null,"9(","cC","gG"],"+":["/?","]}",null,"\\|",null,"-_"],",":"'\",2@,3#,.>,oO,aA".split(","),"-":["sS","/?","=+",null,null,"zZ"],".":",< 3# 4$ pP eE oO".split(" "),"/":"lL,[{,]},=+,-_,sS".split(","),"0":["9(",null,null,"[{","lL","rR"],1:["`~",null,null,"2@","'\"",null],2:["1!",null,null,"3#",",<","'\""],3:["2@",null,null,"4$",".>",",<"],4:["3#",null,null,"5%","pP",
        ".>"],5:["4$",null,null,"6^","yY","pP"],6:["5%",null,null,"7&","fF","yY"],7:["6^",null,null,"8*","gG","fF"],8:["7&",null,null,"9(","cC","gG"],9:["8*",null,null,"0)","rR","cC"],":":[null,"aA","oO","qQ",null,null],";":[null,"aA","oO","qQ",null,null],"<":"'\",2@,3#,.>,oO,aA".split(","),"=":["/?","]}",null,"\\|",null,"-_"],">":",< 3# 4$ pP eE oO".split(" "),"?":"lL,[{,]},=+,-_,sS".split(","),"@":["1!",null,null,"3#",",<","'\""],A:[null,"'\"",",<","oO",";:",null],B:["xX","dD","hH","mM",null,null],C:"gG,8*,9(,rR,tT,hH".split(","),
        D:"iI,fF,gG,hH,bB,xX".split(","),E:"oO,.>,pP,uU,jJ,qQ".split(","),F:"yY,6^,7&,gG,dD,iI".split(","),G:"fF,7&,8*,cC,hH,dD".split(","),H:"dD,gG,cC,tT,mM,bB".split(","),I:"uU,yY,fF,dD,xX,kK".split(","),J:["qQ","eE","uU","kK",null,null],K:["jJ","uU","iI","xX",null,null],L:"rR,0),[{,/?,sS,nN".split(","),M:["bB","hH","tT","wW",null,null],N:"tT,rR,lL,sS,vV,wW".split(","),O:"aA ,< .> eE qQ ;:".split(" "),P:".>,4$,5%,yY,uU,eE".split(","),Q:[";:","oO","eE","jJ",null,null],R:"cC,9(,0),lL,nN,tT".split(","),S:"nN,lL,/?,-_,zZ,vV".split(","),
        T:"hH,cC,rR,nN,wW,mM".split(","),U:"eE,pP,yY,iI,kK,jJ".split(","),V:["wW","nN","sS","zZ",null,null],W:["mM","tT","nN","vV",null,null],X:["kK","iI","dD","bB",null,null],Y:"pP,5%,6^,fF,iI,uU".split(","),Z:["vV","sS","-_",null,null,null],"[":["0)",null,null,"]}","/?","lL"],"\\":["=+",null,null,null,null,null],"]":["[{",null,null,null,"=+","/?"],"^":["5%",null,null,"7&","fF","yY"],_:["sS","/?","=+",null,null,"zZ"],"`":[null,null,null,"1!",null,null],a:[null,"'\"",",<","oO",";:",null],b:["xX","dD","hH",
            "mM",null,null],c:"gG,8*,9(,rR,tT,hH".split(","),d:"iI,fF,gG,hH,bB,xX".split(","),e:"oO,.>,pP,uU,jJ,qQ".split(","),f:"yY,6^,7&,gG,dD,iI".split(","),g:"fF,7&,8*,cC,hH,dD".split(","),h:"dD,gG,cC,tT,mM,bB".split(","),i:"uU,yY,fF,dD,xX,kK".split(","),j:["qQ","eE","uU","kK",null,null],k:["jJ","uU","iI","xX",null,null],l:"rR,0),[{,/?,sS,nN".split(","),m:["bB","hH","tT","wW",null,null],n:"tT,rR,lL,sS,vV,wW".split(","),o:"aA ,< .> eE qQ ;:".split(" "),p:".>,4$,5%,yY,uU,eE".split(","),q:[";:","oO","eE","jJ",
            null,null],r:"cC,9(,0),lL,nN,tT".split(","),s:"nN,lL,/?,-_,zZ,vV".split(","),t:"hH,cC,rR,nN,wW,mM".split(","),u:"eE,pP,yY,iI,kK,jJ".split(","),v:["wW","nN","sS","zZ",null,null],w:["mM","tT","nN","vV",null,null],x:["kK","iI","dD","bB",null,null],y:"pP,5%,6^,fF,iI,uU".split(","),z:["vV","sS","-_",null,null,null],"{":["0)",null,null,"]}","/?","lL"],"|":["=+",null,null,null,null,null],"}":["[{",null,null,null,"=+","/?"],"~":[null,null,null,"1!",null,null]},keypad:F,mac_keypad:{"*":["/",null,null,null,
        null,null,"-","9"],"+":["6","9","-",null,null,null,null,"3"],"-":["9","/","*",null,null,null,"+","6"],".":["0","2","3",null,null,null,null,null],"/":["=",null,null,null,"*","-","9","8"],"0":[null,"1","2","3",".",null,null,null],1:[null,null,"4","5","2","0",null,null],2:["1","4","5","6","3",".","0",null],3:["2","5","6","+",null,null,".","0"],4:[null,null,"7","8","5","2","1",null],5:"4,7,8,9,6,3,2,1".split(","),6:["5","8","9","-","+",null,"3","2"],7:[null,null,null,"=","8","5","4",null],8:["7",null,
        "=","/","9","6","5","4"],9:"8,=,/,*,-,+,6,5".split(","),"=":[null,null,null,null,"/","9","8","7"]}};t=function(b){var a,d,c,e,f;a=0;for(c in b)f=b[c],a+=function(){var a,b,c;c=[];a=0;for(b=f.length;a<b;a++)(e=f[a])&&c.push(e);return c}().length;return a/=function(){var a;a=[];for(d in b)a.push(d);return a}().length};oa=t(E);qa=t(F);na=function(){var b;b=[];for(w in E)b.push(w);return b}().length;pa=function(){var b;b=[];for(w in F)b.push(w);return b}().length;H=function(){return(new Date).getTime()};
    t=function(b,a){var d,c;null==a&&(a=[]);c=H();d=Q(b,ra.concat([r("user_inputs",q(a.map(function(a){return a.toLowerCase()})))]));d=ia(b,d);d.calc_time=H()-c;return d};"undefined"!==typeof window&&null!==window?(window.zxcvbn=t,"function"===typeof window.zxcvbn_load_hook&&window.zxcvbn_load_hook()):"undefined"!==typeof exports&&null!==exports&&(exports.zxcvbn=t)})();
(function() {
  jQuery(function() {
    var displayHint;
    displayHint = function(strength, crack_time) {
      var estimate_message, msg;
      msg = 'Password is ' + strength + ' (time to break it: ' + crack_time + ')';
      estimate_message = this.next('.estimate-message');
      if (estimate_message.length > 0) {
        return estimate_message.text(msg);
      } else {
        return this.after('<span class="help-block estimate-message">' + msg + '</span>');
      }
    };
    $('form').on('keyup', '.estimate-password', function() {
      var $this, crack_time, estimation;
      $this = $(this);
      estimation = zxcvbn($this.val());
      crack_time = estimation.crack_time_display;
      switch (estimation.score) {
        case 0:
          return displayHint.call($this, "very weak", crack_time);
        case 1:
          return displayHint.call($this, "weak", crack_time);
        case 2:
          return displayHint.call($this, "okay", crack_time);
        case 3:
          return displayHint.call($this, "strong", crack_time);
        case 4:
          return displayHint.call($this, "very strong", crack_time);
      }
    });
  });

}).call(this);

/*!
 * Client Side Validations - v4.2.2 (https://github.com/DavyJonesLocker/client_side_validations)
 * Copyright (c) 2016 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
 */


(function() {
  var $, validateElement, validateForm, validatorsFor,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = jQuery;

  $.fn.disableClientSideValidations = function() {
    ClientSideValidations.disable(this);
    return this;
  };

  $.fn.enableClientSideValidations = function() {
    this.filter(ClientSideValidations.selectors.forms).each(function() {
      return ClientSideValidations.enablers.form(this);
    });
    this.filter(ClientSideValidations.selectors.inputs).each(function() {
      return ClientSideValidations.enablers.input(this);
    });
    return this;
  };

  $.fn.resetClientSideValidations = function() {
    this.filter(ClientSideValidations.selectors.forms).each(function() {
      return ClientSideValidations.reset(this);
    });
    return this;
  };

  $.fn.validate = function() {
    this.filter(ClientSideValidations.selectors.forms).each(function() {
      return $(this).enableClientSideValidations();
    });
    return this;
  };

  $.fn.isValid = function(validators) {
    var obj;
    obj = $(this[0]);
    if (obj.is('form')) {
      return validateForm(obj, validators);
    } else {
      return validateElement(obj, validatorsFor(this[0].name, validators));
    }
  };

  validatorsFor = function(name, validators) {
    var captures, validator, validator_name;
    if (captures = name.match(/\[(\w+_attributes)\].*\[(\w+)\]$/)) {
      for (validator_name in validators) {
        validator = validators[validator_name];
        if (validator_name.match("\\[" + captures[1] + "\\].*\\[\\]\\[" + captures[2] + "\\]$")) {
          name = name.replace(/\[[\da-z_]+\]\[(\w+)\]$/g, "[][$1]");
        }
      }
    }
    return validators[name] || {};
  };

  validateForm = function(form, validators) {
    var valid;
    form.trigger('form:validate:before.ClientSideValidations');
    valid = true;
    form.find(ClientSideValidations.selectors.validate_inputs).each(function() {
      if (!$(this).isValid(validators)) {
        valid = false;
      }
      return true;
    });
    if (valid) {
      form.trigger('form:validate:pass.ClientSideValidations');
    } else {
      form.trigger('form:validate:fail.ClientSideValidations');
    }
    form.trigger('form:validate:after.ClientSideValidations');
    return valid;
  };

  validateElement = function(element, validators) {
    var afterValidate, destroyInputName, executeValidators, failElement, local, passElement, remote;
    element.trigger('element:validate:before.ClientSideValidations');
    passElement = function() {
      return element.trigger('element:validate:pass.ClientSideValidations').data('valid', null);
    };
    failElement = function(message) {
      element.trigger('element:validate:fail.ClientSideValidations', message).data('valid', false);
      return false;
    };
    afterValidate = function() {
      return element.trigger('element:validate:after.ClientSideValidations').data('valid') !== false;
    };
    executeValidators = function(context) {
      var fn, i, kind, len, message, ref, valid, validator;
      valid = true;
      for (kind in context) {
        fn = context[kind];
        if (validators[kind]) {
          ref = validators[kind];
          for (i = 0, len = ref.length; i < len; i++) {
            validator = ref[i];
            if (message = fn.call(context, element, validator)) {
              valid = failElement(message);
              break;
            }
          }
          if (!valid) {
            break;
          }
        }
      }
      return valid;
    };
    if (element.attr('name').search(/\[([^\]]*?)\]$/) >= 0) {
      destroyInputName = element.attr('name').replace(/\[([^\]]*?)\]$/, '[_destroy]');
      if ($("input[name='" + destroyInputName + "']").val() === "1") {
        passElement();
        return afterValidate();
      }
    }
    if (element.data('changed') === false) {
      return afterValidate();
    }
    element.data('changed', false);
    local = ClientSideValidations.validators.local;
    remote = ClientSideValidations.validators.remote;
    if (executeValidators(local) && executeValidators(remote)) {
      passElement();
    }
    return afterValidate();
  };

  if (window.ClientSideValidations === void 0) {
    window.ClientSideValidations = {};
  }

  if (window.ClientSideValidations.forms === void 0) {
    window.ClientSideValidations.forms = {};
  }

  window.ClientSideValidations.selectors = {
    inputs: ':input:not(button):not([type="submit"])[name]:visible:enabled',
    validate_inputs: ':input:enabled:visible[data-validate]',
    forms: 'form[data-validate]'
  };

  window.ClientSideValidations.reset = function(form) {
    var $form, key;
    $form = $(form);
    ClientSideValidations.disable(form);
    for (key in form.ClientSideValidations.settings.validators) {
      form.ClientSideValidations.removeError($form.find("[name='" + key + "']"));
    }
    return ClientSideValidations.enablers.form(form);
  };

  window.ClientSideValidations.disable = function(target) {
    var $target;
    $target = $(target);
    $target.off('.ClientSideValidations');
    if ($target.is('form')) {
      return ClientSideValidations.disable($target.find(':input'));
    } else {
      $target.removeData('valid');
      $target.removeData('changed');
      return $target.filter(':input').each(function() {
        return $(this).removeAttr('data-validate');
      });
    }
  };

  window.ClientSideValidations.enablers = {
    form: function(form) {
      var $form, binding, event, ref;
      $form = $(form);
      form.ClientSideValidations = {
        settings: window.ClientSideValidations.forms[$form.attr('id')],
        addError: function(element, message) {
          return ClientSideValidations.formBuilders[form.ClientSideValidations.settings.type].add(element, form.ClientSideValidations.settings, message);
        },
        removeError: function(element) {
          return ClientSideValidations.formBuilders[form.ClientSideValidations.settings.type].remove(element, form.ClientSideValidations.settings);
        }
      };
      ref = {
        'submit.ClientSideValidations': function(eventData) {
          if (!$form.isValid(form.ClientSideValidations.settings.validators)) {
            eventData.preventDefault();
            return eventData.stopImmediatePropagation();
          }
        },
        'ajax:beforeSend.ClientSideValidations': function(eventData) {
          if (eventData.target === this) {
            return $form.isValid(form.ClientSideValidations.settings.validators);
          }
        },
        'form:validate:after.ClientSideValidations': function(eventData) {
          return ClientSideValidations.callbacks.form.after($form, eventData);
        },
        'form:validate:before.ClientSideValidations': function(eventData) {
          return ClientSideValidations.callbacks.form.before($form, eventData);
        },
        'form:validate:fail.ClientSideValidations': function(eventData) {
          return ClientSideValidations.callbacks.form.fail($form, eventData);
        },
        'form:validate:pass.ClientSideValidations': function(eventData) {
          return ClientSideValidations.callbacks.form.pass($form, eventData);
        }
      };
      for (event in ref) {
        binding = ref[event];
        $form.on(event, binding);
      }
      return $form.find(ClientSideValidations.selectors.inputs).each(function() {
        return ClientSideValidations.enablers.input(this);
      });
    },
    input: function(input) {
      var $form, $input, binding, event, form, ref;
      $input = $(input);
      form = input.form;
      $form = $(form);
      ref = {
        'focusout.ClientSideValidations': function() {
          return $(this).isValid(form.ClientSideValidations.settings.validators);
        },
        'change.ClientSideValidations': function() {
          return $(this).data('changed', true);
        },
        'element:validate:after.ClientSideValidations': function(eventData) {
          return ClientSideValidations.callbacks.element.after($(this), eventData);
        },
        'element:validate:before.ClientSideValidations': function(eventData) {
          return ClientSideValidations.callbacks.element.before($(this), eventData);
        },
        'element:validate:fail.ClientSideValidations': function(eventData, message) {
          var element;
          element = $(this);
          return ClientSideValidations.callbacks.element.fail(element, message, function() {
            return form.ClientSideValidations.addError(element, message);
          }, eventData);
        },
        'element:validate:pass.ClientSideValidations': function(eventData) {
          var element;
          element = $(this);
          return ClientSideValidations.callbacks.element.pass(element, function() {
            return form.ClientSideValidations.removeError(element);
          }, eventData);
        }
      };
      for (event in ref) {
        binding = ref[event];
        $input.filter(':not(:radio):not([id$=_confirmation])').each(function() {
          return $(this).attr('data-validate', true);
        }).on(event, binding);
      }
      $input.filter(':checkbox').on('change.ClientSideValidations', function() {
        return $(this).isValid(form.ClientSideValidations.settings.validators);
      });
      return $input.filter('[id$=_confirmation]').each(function() {
        var confirmationElement, element, ref1, results;
        confirmationElement = $(this);
        element = $form.find("#" + (this.id.match(/(.+)_confirmation/)[1]) + ":input");
        if (element[0]) {
          ref1 = {
            'focusout.ClientSideValidations': function() {
              return element.data('changed', true).isValid(form.ClientSideValidations.settings.validators);
            },
            'keyup.ClientSideValidations': function() {
              return element.data('changed', true).isValid(form.ClientSideValidations.settings.validators);
            }
          };
          results = [];
          for (event in ref1) {
            binding = ref1[event];
            results.push($("#" + (confirmationElement.attr('id'))).on(event, binding));
          }
          return results;
        }
      });
    }
  };

  window.ClientSideValidations.validators = {
    all: function() {
      return $.extend({}, ClientSideValidations.validators.local, ClientSideValidations.validators.remote);
    },
    local: {
      absence: function(element, options) {
        if (!/^\s*$/.test(element.val() || '')) {
          return options.message;
        }
      },
      presence: function(element, options) {
        if (/^\s*$/.test(element.val() || '')) {
          return options.message;
        }
      },
      acceptance: function(element, options) {
        var ref;
        switch (element.attr('type')) {
          case 'checkbox':
            if (!element.prop('checked')) {
              return options.message;
            }
            break;
          case 'text':
            if (element.val() !== (((ref = options.accept) != null ? ref.toString() : void 0) || '1')) {
              return options.message;
            }
        }
      },
      format: function(element, options) {
        var message;
        message = this.presence(element, options);
        if (message) {
          if (options.allow_blank === true) {
            return;
          }
          return message;
        }
        if (options["with"] && !new RegExp(options["with"].source, options["with"].options).test(element.val())) {
          return options.message;
        }
        if (options.without && new RegExp(options.without.source, options.without.options).test(element.val())) {
          return options.message;
        }
      },
      numericality: function(element, options) {
        var CHECKS, check, check_value, fn, form, operator, val;
        val = $.trim(element.val());
        if (!ClientSideValidations.patterns.numericality.test(val)) {
          if (options.allow_blank === true && this.presence(element, {
            message: options.messages.numericality
          })) {
            return;
          }
          return options.messages.numericality;
        }
        val = val.replace(new RegExp("\\" + ClientSideValidations.number_format.delimiter, 'g'), "").replace(new RegExp("\\" + ClientSideValidations.number_format.separator, 'g'), ".");
        if (options.only_integer && !/^[+-]?\d+$/.test(val)) {
          return options.messages.only_integer;
        }
        CHECKS = {
          greater_than: '>',
          greater_than_or_equal_to: '>=',
          equal_to: '==',
          less_than: '<',
          less_than_or_equal_to: '<='
        };
        form = $(element[0].form);
        for (check in CHECKS) {
          operator = CHECKS[check];
          if (!(options[check] != null)) {
            continue;
          }
          if (!isNaN(parseFloat(options[check])) && isFinite(options[check])) {
            check_value = options[check];
          } else if (form.find("[name*=" + options[check] + "]").size() === 1) {
            check_value = form.find("[name*=" + options[check] + "]").val();
          } else {
            return;
          }
          fn = new Function("return " + val + " " + operator + " " + check_value);
          if (!fn()) {
            return options.messages[check];
          }
        }
        if (options.odd && !(parseInt(val, 10) % 2)) {
          return options.messages.odd;
        }
        if (options.even && (parseInt(val, 10) % 2)) {
          return options.messages.even;
        }
      },
      length: function(element, options) {
        var CHECKS, blankOptions, check, fn, message, operator, tokenized_length, tokenizer;
        tokenizer = options.js_tokenizer || "split('')";
        tokenized_length = new Function('element', "return (element.val()." + tokenizer + " || '').length")(element);
        CHECKS = {
          is: '==',
          minimum: '>=',
          maximum: '<='
        };
        blankOptions = {};
        blankOptions.message = options.is ? options.messages.is : options.minimum ? options.messages.minimum : void 0;
        message = this.presence(element, blankOptions);
        if (message) {
          if (options.allow_blank === true) {
            return;
          }
          return message;
        }
        for (check in CHECKS) {
          operator = CHECKS[check];
          if (!options[check]) {
            continue;
          }
          fn = new Function("return " + tokenized_length + " " + operator + " " + options[check]);
          if (!fn()) {
            return options.messages[check];
          }
        }
      },
      exclusion: function(element, options) {
        var lower, message, option, ref, upper;
        message = this.presence(element, options);
        if (message) {
          if (options.allow_blank === true) {
            return;
          }
          return message;
        }
        if (options["in"]) {
          if (ref = element.val(), indexOf.call((function() {
            var i, len, ref1, results;
            ref1 = options["in"];
            results = [];
            for (i = 0, len = ref1.length; i < len; i++) {
              option = ref1[i];
              results.push(option.toString());
            }
            return results;
          })(), ref) >= 0) {
            return options.message;
          }
        }
        if (options.range) {
          lower = options.range[0];
          upper = options.range[1];
          if (element.val() >= lower && element.val() <= upper) {
            return options.message;
          }
        }
      },
      inclusion: function(element, options) {
        var lower, message, option, ref, upper;
        message = this.presence(element, options);
        if (message) {
          if (options.allow_blank === true) {
            return;
          }
          return message;
        }
        if (options["in"]) {
          if (ref = element.val(), indexOf.call((function() {
            var i, len, ref1, results;
            ref1 = options["in"];
            results = [];
            for (i = 0, len = ref1.length; i < len; i++) {
              option = ref1[i];
              results.push(option.toString());
            }
            return results;
          })(), ref) >= 0) {
            return;
          }
          return options.message;
        }
        if (options.range) {
          lower = options.range[0];
          upper = options.range[1];
          if (element.val() >= lower && element.val() <= upper) {
            return;
          }
          return options.message;
        }
      },
      confirmation: function(element, options) {
        if (element.val() !== $("#" + (element.attr('id')) + "_confirmation").val()) {
          return options.message;
        }
      },
      uniqueness: function(element, options) {
        var form, matches, name, name_prefix, name_suffix, valid, value;
        name = element.attr('name');
        if (/_attributes\]\[\d/.test(name)) {
          matches = name.match(/^(.+_attributes\])\[\d+\](.+)$/);
          name_prefix = matches[1];
          name_suffix = matches[2];
          value = element.val();
          if (name_prefix && name_suffix) {
            form = element.closest('form');
            valid = true;
            form.find(':input[name^="' + name_prefix + '"][name$="' + name_suffix + '"]').each(function() {
              if ($(this).attr('name') !== name) {
                if ($(this).val() === value) {
                  valid = false;
                  return $(this).data('notLocallyUnique', true);
                } else {
                  if ($(this).data('notLocallyUnique')) {
                    return $(this).removeData('notLocallyUnique').data('changed', true);
                  }
                }
              }
            });
            if (!valid) {
              return options.message;
            }
          }
        }
      }
    },
    remote: {
      uniqueness: function(element, options) {
        var data, key, message, name, ref, scope_value, scoped_element, scoped_name;
        message = ClientSideValidations.validators.local.presence(element, options);
        if (message) {
          if (options.allow_blank === true) {
            return;
          }
          return message;
        }
        data = {};
        data.case_sensitive = !!options.case_sensitive;
        if (options.id) {
          data.id = options.id;
        }
        if (options.scope) {
          data.scope = {};
          ref = options.scope;
          for (key in ref) {
            scope_value = ref[key];
            scoped_name = element.attr('name').replace(/\[\w+\]$/, "[" + key + "]");
            scoped_element = $("[name='" + scoped_name + "']");
            $("[name='" + scoped_name + "']:checkbox").each(function() {
              if (this.checked) {
                return scoped_element = this;
              }
            });
            if (scoped_element[0] && scoped_element.val() !== scope_value) {
              data.scope[key] = scoped_element.val();
              scoped_element.unbind("change." + element.id).bind("change." + element.id, function() {
                element.trigger('change.ClientSideValidations');
                return element.trigger('focusout.ClientSideValidations');
              });
            } else {
              data.scope[key] = scope_value;
            }
          }
        }
        if (/_attributes\]/.test(element.attr('name'))) {
          name = element.attr('name').match(/\[\w+_attributes\]/g).pop().match(/\[(\w+)_attributes\]/).pop();
          name += /(\[\w+\])$/.exec(element.attr('name'))[1];
        } else {
          name = element.attr('name');
        }
        if (options['class']) {
          name = options['class'] + '[' + name.split('[')[1];
        }
        data[name] = element.val();
        if ($.ajax({
          url: ClientSideValidations.remote_validators_url_for('uniqueness'),
          data: data,
          async: false,
          cache: false
        }).status === 200) {
          return options.message;
        }
      }
    }
  };

  window.ClientSideValidations.remote_validators_url_for = function(validator) {
    if (ClientSideValidations.remote_validators_prefix != null) {
      return "//" + window.location.host + "/" + ClientSideValidations.remote_validators_prefix + "/validators/" + validator;
    } else {
      return "//" + window.location.host + "/validators/" + validator;
    }
  };

  window.ClientSideValidations.disableValidators = function() {
    var func, ref, results, validator;
    if (window.ClientSideValidations.disabled_validators === void 0) {
      return;
    }
    ref = window.ClientSideValidations.validators.remote;
    results = [];
    for (validator in ref) {
      func = ref[validator];
      if (indexOf.call(window.ClientSideValidations.disabled_validators, validator) >= 0) {
        results.push(delete window.ClientSideValidations.validators.remote[validator]);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  window.ClientSideValidations.formBuilders = {
    'ActionView::Helpers::FormBuilder': {
      add: function(element, settings, message) {
        var form, inputErrorField, label, labelErrorField;
        form = $(element[0].form);
        if (element.data('valid') !== false && (form.find("label.message[for='" + (element.attr('id')) + "']")[0] == null)) {
          inputErrorField = $(settings.input_tag);
          labelErrorField = $(settings.label_tag);
          label = form.find("label[for='" + (element.attr('id')) + "']:not(.message)");
          if (element.attr('autofocus')) {
            element.attr('autofocus', false);
          }
          element.before(inputErrorField);
          inputErrorField.find('span#input_tag').replaceWith(element);
          inputErrorField.find('label.message').attr('for', element.attr('id'));
          labelErrorField.find('label.message').attr('for', element.attr('id'));
          labelErrorField.insertAfter(label);
          labelErrorField.find('label#label_tag').replaceWith(label);
        }
        return form.find("label.message[for='" + (element.attr('id')) + "']").text(message);
      },
      remove: function(element, settings) {
        var errorFieldClass, form, inputErrorField, label, labelErrorField;
        form = $(element[0].form);
        errorFieldClass = $(settings.input_tag).attr('class');
        inputErrorField = element.closest("." + (errorFieldClass.replace(/\ /g, ".")));
        label = form.find("label[for='" + (element.attr('id')) + "']:not(.message)");
        labelErrorField = label.closest("." + errorFieldClass);
        if (inputErrorField[0]) {
          inputErrorField.find("#" + (element.attr('id'))).detach();
          inputErrorField.replaceWith(element);
          label.detach();
          return labelErrorField.replaceWith(label);
        }
      }
    }
  };

  window.ClientSideValidations.patterns = {
    numericality: /^(-|\+)?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?$/
  };

  window.ClientSideValidations.callbacks = {
    element: {
      after: function(element, eventData) {},
      before: function(element, eventData) {},
      fail: function(element, message, addError, eventData) {
        return addError();
      },
      pass: function(element, removeError, eventData) {
        return removeError();
      }
    },
    form: {
      after: function(form, eventData) {},
      before: function(form, eventData) {},
      fail: function(form, eventData) {},
      pass: function(form, eventData) {}
    }
  };

  $(document).bind((window.Turbolinks ? 'page:change' : 'ready'), function() {
    ClientSideValidations.disableValidators();
    return $(ClientSideValidations.selectors.forms).validate();
  });

}).call(this);

/*!
 * Client Side Validations - SimpleForm - v3.2.1 (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) 2016 Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (http://opensource.org/licenses/mit-license.php)
 */


(function() {
  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'] = {
    add: function(element, settings, message) {
      return this.wrappers[settings.wrapper].add.call(this, element, settings, message);
    },
    remove: function(element, settings) {
      return this.wrappers[settings.wrapper].remove.call(this, element, settings);
    },
    wrappers: {
      "default": {
        add: function(element, settings, message) {
          var errorElement, wrapper;
          wrapper = element.closest(settings.wrapper_tag + "." + (settings.wrapper_class.replace(/\ /g, '.')));
          errorElement = wrapper.find(settings.error_tag + "." + settings.error_class);
          if (!errorElement.length) {
            errorElement = $("<" + settings.error_tag + "/>", {
              "class": settings.error_class,
              text: message
            });
            wrapper.append(errorElement);
          }
          wrapper.addClass(settings.wrapper_error_class);
          return errorElement.text(message);
        },
        remove: function(element, settings) {
          var errorElement, wrapper;
          wrapper = element.closest(settings.wrapper_tag + "." + (settings.wrapper_class.replace(/\ /g, '.')) + "." + settings.wrapper_error_class);
          errorElement = wrapper.find(settings.error_tag + "." + settings.error_class);
          wrapper.removeClass(settings.wrapper_error_class);
          return errorElement.remove();
        }
      }
    }
  };

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.vertical_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers["default"];

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.horizontal_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers["default"];

  ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers.inline_form = ClientSideValidations.formBuilders['SimpleForm::FormBuilder'].wrappers["default"];

}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//






