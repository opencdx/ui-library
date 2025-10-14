function cov_252ltswgum() {
  var path = "/Users/ravisingh/GitHub/OpenCDx/ui-library/src/modal/modal-transition.ts";
  var hash = "788d5cd6026b8d3bc5e3b785c730bd9510768145";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ravisingh/GitHub/OpenCDx/ui-library/src/modal/modal-transition.ts",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 26
        },
        end: {
          line: 33,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "788d5cd6026b8d3bc5e3b785c730bd9510768145"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_252ltswgum = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_252ltswgum();
import { TRANSITION_EASINGS } from "@nextui-org/framer-utils";
export const scaleInOut = (cov_252ltswgum().s[0]++, {
  enter: {
    scale: "var(--scale-enter)",
    y: "var(--slide-enter)",
    opacity: 1,
    transition: {
      scale: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease
      },
      opacity: {
        duration: 0.4,
        ease: TRANSITION_EASINGS.ease
      },
      y: {
        type: "spring",
        bounce: 0,
        duration: 0.6
      }
    }
  },
  exit: {
    scale: "var(--scale-exit)",
    y: "var(--slide-exit)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: TRANSITION_EASINGS.ease
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjUybHRzd2d1bSIsImFjdHVhbENvdmVyYWdlIiwiVFJBTlNJVElPTl9FQVNJTkdTIiwic2NhbGVJbk91dCIsInMiLCJlbnRlciIsInNjYWxlIiwieSIsIm9wYWNpdHkiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJlYXNlIiwidHlwZSIsImJvdW5jZSIsImV4aXQiXSwic291cmNlcyI6WyJtb2RhbC10cmFuc2l0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VFJBTlNJVElPTl9FQVNJTkdTfSBmcm9tIFwiQG5leHR1aS1vcmcvZnJhbWVyLXV0aWxzXCI7XG5cbmV4cG9ydCBjb25zdCBzY2FsZUluT3V0ID0ge1xuICBlbnRlcjoge1xuICAgIHNjYWxlOiBcInZhcigtLXNjYWxlLWVudGVyKVwiLFxuICAgIHk6IFwidmFyKC0tc2xpZGUtZW50ZXIpXCIsXG4gICAgb3BhY2l0eTogMSxcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICBzY2FsZToge1xuICAgICAgICBkdXJhdGlvbjogMC40LFxuICAgICAgICBlYXNlOiBUUkFOU0lUSU9OX0VBU0lOR1MuZWFzZSxcbiAgICAgIH0sXG4gICAgICBvcGFjaXR5OiB7XG4gICAgICAgIGR1cmF0aW9uOiAwLjQsXG4gICAgICAgIGVhc2U6IFRSQU5TSVRJT05fRUFTSU5HUy5lYXNlLFxuICAgICAgfSxcbiAgICAgIHk6IHtcbiAgICAgICAgdHlwZTogXCJzcHJpbmdcIixcbiAgICAgICAgYm91bmNlOiAwLFxuICAgICAgICBkdXJhdGlvbjogMC42LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBleGl0OiB7XG4gICAgc2NhbGU6IFwidmFyKC0tc2NhbGUtZXhpdClcIixcbiAgICB5OiBcInZhcigtLXNsaWRlLWV4aXQpXCIsXG4gICAgb3BhY2l0eTogMCxcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgZWFzZTogVFJBTlNJVElPTl9FQVNJTkdTLmVhc2UsXG4gICAgfSxcbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQVFFLGtCQUFrQixRQUFPLDBCQUEwQjtBQUUzRCxPQUFPLE1BQU1DLFVBQVUsSUFBQUgsY0FBQSxHQUFBSSxDQUFBLE9BQUc7RUFDeEJDLEtBQUssRUFBRTtJQUNMQyxLQUFLLEVBQUUsb0JBQW9CO0lBQzNCQyxDQUFDLEVBQUUsb0JBQW9CO0lBQ3ZCQyxPQUFPLEVBQUUsQ0FBQztJQUNWQyxVQUFVLEVBQUU7TUFDVkgsS0FBSyxFQUFFO1FBQ0xJLFFBQVEsRUFBRSxHQUFHO1FBQ2JDLElBQUksRUFBRVQsa0JBQWtCLENBQUNTO01BQzNCLENBQUM7TUFDREgsT0FBTyxFQUFFO1FBQ1BFLFFBQVEsRUFBRSxHQUFHO1FBQ2JDLElBQUksRUFBRVQsa0JBQWtCLENBQUNTO01BQzNCLENBQUM7TUFDREosQ0FBQyxFQUFFO1FBQ0RLLElBQUksRUFBRSxRQUFRO1FBQ2RDLE1BQU0sRUFBRSxDQUFDO1FBQ1RILFFBQVEsRUFBRTtNQUNaO0lBQ0Y7RUFDRixDQUFDO0VBQ0RJLElBQUksRUFBRTtJQUNKUixLQUFLLEVBQUUsbUJBQW1CO0lBQzFCQyxDQUFDLEVBQUUsbUJBQW1CO0lBQ3RCQyxPQUFPLEVBQUUsQ0FBQztJQUNWQyxVQUFVLEVBQUU7TUFDVkMsUUFBUSxFQUFFLEdBQUc7TUFDYkMsSUFBSSxFQUFFVCxrQkFBa0IsQ0FBQ1M7SUFDM0I7RUFDRjtBQUNGLENBQUMiLCJpZ25vcmVMaXN0IjpbXX0=