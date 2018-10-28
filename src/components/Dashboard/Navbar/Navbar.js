import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDollarSign, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
const navbar = props => {
  return (
    <div className="boxed">
      <nav id="mainnav-container">
        <div id="mainnav">
          <div id="mainnav-menu-wrap">
            <div class="nano">
              <div class="nano-content" tabIndex="0">
                <ul id="mainnav-menu" class="list-group">
                  <li class="list-header">Menu</li>
                  <li class="active-sub">
                    <a data-original-title="" title="">
                      <FontAwesomeIcon icon={faDollarSign} style={{fontSize: '1.4em', marginRight: "5px"}}/>
                      <span class="menu-title"> Spot USD/COP</span>
                    </a>
                  </li>
                  <li>
                    <a data-original-title="" title="">
                      <FontAwesomeIcon icon={faCalendarAlt} style={{fontSize: '1.4em', marginRight: "5px"}}/>
                      <span class="menu-title"> Next day USD/COP</span>
                    </a>
                  </li>
                  <li>
                    <a data-original-title="" title="">
                      <i class="demo-pli-gear" />
                      <span class="menu-title">Estadisticas</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
